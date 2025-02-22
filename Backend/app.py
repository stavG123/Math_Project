from flask import Flask, jsonify  # type: ignore
from flask_sqlalchemy import SQLAlchemy  # type: ignore

app = Flask(__name__)

# ✅ Correct PostgreSQL Database Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql://postgres:stavG1234@localhost:5432/Math_Project"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize the database
db = SQLAlchemy(app)


# ✅ Define Models for Your Tables
class Swimmer(db.Model):
    __tablename__ = "swimmers"  # Correct table name
    swimmer_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))


class Practice(db.Model):
    __tablename__ = "practices"
    practice_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)


class SwimmerPerformance(db.Model):
    __tablename__ = "swimmer_performance"
    swimmer_id = db.Column(
        db.Integer, db.ForeignKey("swimmers.swimmer_id"), primary_key=True
    )
    practice_id = db.Column(
        db.Integer, db.ForeignKey("practices.practice_id"), primary_key=True
    )
    backstroke = db.Column(db.Integer)
    freestyle = db.Column(db.Integer)
    butterfly = db.Column(db.Integer)
    breaststroke = db.Column(db.Integer)
    kick = db.Column(db.Integer)
    total_time = db.Column(db.Integer)
    total_distance = db.Column(db.Integer)
    calories_burned = db.Column(db.Integer)
    splash_score = db.Column(db.Integer)
    training_load = db.Column(db.Integer)
    average_hr = db.Column(db.Integer)
    max_hr = db.Column(db.Integer)


# ✅ Route to Fetch Swimmers
@app.route("/swimmers", methods=["GET"])
def get_swimmers():
    swimmers = Swimmer.query.all()
    data = [
        {"Swimmer_ID": s.swimmer_id, "Name": s.name, "Age": s.age, "Gender": s.gender}
        for s in swimmers
    ]
    return jsonify(data)


# ✅ Route to Fetch Practices
@app.route("/practices", methods=["GET"])
def get_practices():
    practices = Practice.query.all()
    data = [
        {"Practice_ID": p.practice_id, "Date": p.date.strftime("%Y-%m-%d")}
        for p in practices
    ]
    return jsonify(data)


# ✅ Route to Fetch Swimmer Performance
@app.route("/performance", methods=["GET"])
def get_performance():
    performances = SwimmerPerformance.query.all()
    data = [
        {
            "Swimmer_ID": p.swimmer_id,
            "Practice_ID": p.practice_id,
            "Backstroke": p.backstroke,
            "Freestyle": p.freestyle,
            "Butterfly": p.butterfly,
            "Breaststroke": p.breaststroke,
            "Kick": p.kick,
            "Total_Time": p.total_time,
            "Total_Distance": p.total_distance,
            "Calories_Burned": p.calories_burned,
            "Splash_Score": p.splash_score,
            "Training_Load": p.training_load,
            "Average_HR": p.average_hr,
            "Max_HR": p.max_hr,
        }
        for p in performances
    ]
    return jsonify(data)


# Home Route
@app.route("/")
def home():
    return "Connected to PostgreSQL successfully!"


if __name__ == "__main__":
    app.run(debug=True)
