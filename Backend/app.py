from flask import Flask, request, jsonify  # type: ignore
from flask_sqlalchemy import SQLAlchemy  # type: ignore
from flask_cors import CORS  # type: ignore
from sqlalchemy import text  # type: ignore

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql://postgres:stavG1234@localhost:5432/Math_Project"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ✅ Global variable to store last deleted swimmer
last_deleted_swimmer = None

# ✅ Swimmer Model
class Swimmer(db.Model):
    __tablename__ = "swimmers"
    swimmer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)

# ✅ Route to Fetch Swimmers
@app.route("/swimmers", methods=["GET"])
def get_swimmers():
    swimmers = Swimmer.query.order_by(Swimmer.swimmer_id.asc()).all()  # ✅ Order by swimmer_id ASC
    data = [
        {"Swimmer_ID": s.swimmer_id, "Name": s.name, "Age": s.age, "Gender": s.gender}
        for s in swimmers
    ]
    return jsonify(data)

@app.route("/swimmer", methods=["POST"])
def insert_swimmer():
    data = request.get_json()

    # ✅ Fetch the highest swimmer_id in the table
    max_id_result = db.session.execute(text("SELECT MAX(swimmer_id) FROM swimmers")).scalar()
    
    # ✅ If no swimmers exist yet, start with ID 1, else increment max_id by 1
    next_id = 1 if max_id_result is None else max_id_result + 1

    # ✅ Insert the new swimmer with the correct ID
    new_swimmer = Swimmer(swimmer_id=next_id, name=data["name"], age=data["age"], gender=data["gender"])
    db.session.add(new_swimmer)
    db.session.commit()

    return jsonify({"message": "Swimmer added successfully!", "Swimmer_ID": new_swimmer.swimmer_id}), 201



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

            return jsonify({"message": "Swimmer has been deleted", "last_swimmer": last_deleted_swimmer}), 200
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

if __name__ == "__main__":
    app.run(debug=True)