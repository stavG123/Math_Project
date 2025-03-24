from flask import Flask, request, jsonify  # type: ignore
from flask_sqlalchemy import SQLAlchemy  # type: ignore
from flask_cors import CORS  # type: ignore
from sqlalchemy import text  # type: ignore
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql://postgres:stavG1234@localhost:5432/Math_Project"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ✅ Global variable to store last deleted swimmer
last_deleted_swimmer = None


#  Models DataBase
class Swimmer(db.Model):
    __tablename__ = "swimmers"
    swimmer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)


class Practices(db.Model):  # Capitalized class name for convention
    __tablename__ = "practices"
    practice_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.Date, nullable=False)


class SwimmerPerformance(db.Model):
    __tablename__ = "swimmer_performance"
    swimmer_id = db.Column(
        db.Integer, db.ForeignKey("swimmers.swimmer_id"), primary_key=True
    )
    practice_id = db.Column(
        db.Integer, db.ForeignKey("practices.practice_id"), primary_key=True
    )
    backstroke = db.Column(db.Integer, nullable=False)
    freestyle = db.Column(db.Integer, nullable=False)
    butterfly = db.Column(db.Integer, nullable=False)
    breaststroke = db.Column(db.Integer, nullable=False)
    kick = db.Column(db.Integer, nullable=False)
    total_time = db.Column(db.Integer, nullable=False)
    total_distance = db.Column(db.Integer, nullable=False)
    calories_burned = db.Column(db.Integer, nullable=False)  
    splash_score = db.Column(db.Integer, nullable=False)
    training_load = db.Column(db.Integer, nullable=False)
    average_hr = db.Column(db.Integer, nullable=False)
    max_hr = db.Column(db.Integer, nullable=False)

# GET request is fetching data directly from your PostgreSQL database using SQLAlchemy
@app.route("/swimmer/<int:swimmer_id>/top_distances", methods=["GET"])
def get_swimmer_top_distances(swimmer_id):
    performances = (
        db.session.query(SwimmerPerformance.total_distance, Practices.date)
        .join(Practices, SwimmerPerformance.practice_id == Practices.practice_id)  # ✅ Join Practices table to get the date
        .filter(SwimmerPerformance.swimmer_id == swimmer_id) # Filter by swimmer ID 
        .order_by(SwimmerPerformance.total_distance.desc())
        .limit(5)
        .all()
    )

    if not performances:
        return jsonify({"message": "No data found for this swimmer"}), 404

    # ✅ Format the response to include Date
    data = [{"Date": p.date.strftime("%Y-%m-%d"), "Distance": p.total_distance,} for p in performances]

    return jsonify(data), 200


@app.route("/swimmer/<int:swimmer_id>/calories_burned", methods=["GET"])
def get_swimmer_Calories_Burned(swimmer_id):
    performances = (
        db.session.query(SwimmerPerformance.calories_burned, Practices.date,SwimmerPerformance.total_time)
        .join(Practices, SwimmerPerformance.practice_id == Practices.practice_id)  # ✅ Join Practices table to get the date
        .filter(SwimmerPerformance.swimmer_id == swimmer_id) # join on SQL 
        .order_by(SwimmerPerformance.calories_burned.desc())
        .limit(5)
        .all()
    )
    if not performances:
        return jsonify({"message": "No data found for this swimmer"}), 404
    data = [{"Date": p.date.strftime("%Y-%m-%d"), "Calories_Burned": p.calories_burned,"total_time": p.total_time} for p in performances]
    return jsonify(data), 200

    
@app.route("/swimmer/<int:swimmer_id>/splash_score", methods=["GET"])
def get_swimmer_splash_score(swimmer_id):
    performances = (
         db.session.query(SwimmerPerformance.splash_score,SwimmerPerformance.training_load,SwimmerPerformance.max_hr,SwimmerPerformance.average_hr,Practices.date)
        .join(Practices, SwimmerPerformance.practice_id == Practices.practice_id)  # ✅ Join Practices table to get the date
        .filter(SwimmerPerformance.swimmer_id == swimmer_id) # join on SQL 
        .order_by(SwimmerPerformance.splash_score.desc())
        .limit(5)
        .all()
    )
    if not performances:
        return jsonify({"message": "No data found for this swimmer"}), 404
    data = [{"splash_score": p.splash_score,"training_load": p.training_load,"max_hr":p.max_hr,"average_hr":p.average_hr,"Date": p.date.strftime("%Y-%m-%d")} for p in performances]
    return jsonify(data), 200




# ✅ Route to Fetch Swimmers
@app.route("/swimmers", methods=["GET"])
def get_swimmers():
    swimmers = Swimmer.query.order_by(
        Swimmer.swimmer_id.asc()
    ).all()  # ✅ Order by swimmer_id ASC
    data = [
        {"Swimmer_ID": s.swimmer_id, "Name": s.name, "Age": s.age, "Gender": s.gender}
        for s in swimmers
    ]
    return jsonify(data)


@app.route("/swimmer", methods=["POST"])
def insert_swimmer():
    data = request.get_json()

    # ✅ Check if swimmer already exists
    existing_swimmer = db.session.execute(
        text("SELECT * FROM swimmers WHERE name = :name AND age = :age AND gender = :gender"),
        {"name": data["name"], "age": data["age"], "gender": data["gender"]}
    ).fetchone()

    if existing_swimmer:
        return jsonify({"message": "Swimmer already exists!", "Swimmer_ID": existing_swimmer.swimmer_id}), 409

    # ✅ Fetch the highest swimmer_id in the table
    max_id_result = db.session.execute(
        text("SELECT MAX(swimmer_id) FROM swimmers")
    ).scalar()

    # ✅ If no swimmers exist yet, start with ID 1, else increment max_id by 1
    next_id = 1 if max_id_result is None else max_id_result + 1

    # ✅ Insert the new swimmer with the correct ID
    new_swimmer = Swimmer(
        swimmer_id=next_id, name=data["name"], age=data["age"], gender=data["gender"]
    )
    db.session.add(new_swimmer)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "Swimmer added successfully!",
                "Swimmer_ID": new_swimmer.swimmer_id,
            }
        ),
        201,
    )



# ✅ Route to Delete Last Swimmer
@app.route("/swimmer/delete_last", methods=["DELETE"])
def delete_swimmer():
    global last_deleted_swimmer

    # Find the last swimmer (highest swimmer_id)
    last_swimmer = Swimmer.query.order_by(Swimmer.swimmer_id.desc()).first()

    if last_swimmer:
        if last_swimmer.swimmer_id > 7:
            # Store the deleted swimmer globally
            last_deleted_swimmer = {
                "Swimmer_ID": last_swimmer.swimmer_id,
                "Name": last_swimmer.name,
                "Age": last_swimmer.age,
                "Gender": last_swimmer.gender,
            }

            print(f"Deleted Swimmer: {last_deleted_swimmer}")  # Debugging

            # Delete the swimmer
            db.session.delete(last_swimmer)
            db.session.commit()

            return (
                jsonify(
                    {
                        "message": "Swimmer has been deleted",
                        "last_swimmer": last_deleted_swimmer,
                    }
                ),
                200,
            )
        else:
            return jsonify({"error": "Cannot remove swimmer with ID ≤ 7"}), 403
    else:
        return jsonify({"error": "No swimmers to delete"}), 404


# ✅ Route to Retrieve Last Deleted Swimmer
@app.route("/swimmer/last_deleted", methods=["GET"])
def get_last_deleted_swimmer():
    if last_deleted_swimmer:  # ✅ Check if there is a deleted swimmer stored
        return jsonify({"last_deleted_swimmer": last_deleted_swimmer}), 200
    else:
        return jsonify({"error": "No swimmer has been deleted yet"}), 404
    


@app.route("/predict", methods=["POST"])
def predict_total_distance():
    data = request.get_json()

    try:
        training_load = data["Training_Load"]
        max_hr = data["Max_HR"]
        calories_burned = data["Calories_Burned"]

        # Load all swimmer data
        performances = SwimmerPerformance.query.all()

        # Extract features and target
        X = np.array([
            [p.training_load, p.max_hr, p.calories_burned]
            for p in performances
        ])
        y = np.array([p.total_distance for p in performances])

        # Train model
        model = LinearRegression()
        model.fit(X, y)

        # Predict
        prediction = model.predict([[training_load, max_hr, calories_burned]])[0]

        return jsonify({"Predicted_Total_Distance": round(prediction, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
