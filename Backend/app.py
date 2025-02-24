from flask import Flask, request, jsonify # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS  # type: ignore # Import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from any origin (for debugging)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:stavG1234@localhost:5432/Math_Project'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Swimmer Model
class Swimmer(db.Model):
    __tablename__ = 'swimmers'  # ✅ Define the table name in the database
    swimmer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)

# ✅ Route to Fetch Swimmers
@app.route('/swimmers', methods=['GET'])
def get_swimmers():
    swimmers = Swimmer.query.order_by(Swimmer.swimmer_id.asc()).all()  
    data = [{"Swimmer_ID": s.swimmer_id, "Name": s.name, "Age": s.age, "Gender": s.gender} for s in swimmers]
    return jsonify(data) # ✅ Sends JSON response to frontend


# ✅ Route to Insert a Swimmer
@app.route('/swimmer', methods=['POST'])
def insert_swimmer():
    data = request.get_json() #This line extracts JSON data sent from the frontend (React) to the Flask backend.
    # Get the latest swimmer_id
    last_swimmer = Swimmer.query.order_by(Swimmer.swimmer_id.desc()).first()
    next_id = last_swimmer.swimmer_id + 1 if last_swimmer else 1  # Default to 1 if empty
    # Insert new swimmer with correct ID
    new_swimmer = Swimmer(swimmer_id=next_id, name=data["name"], age=data["age"], gender=data["gender"])
    #add new swimmer to database
    db.session.add(new_swimmer)
    db.session.commit()
    # Reset sequence to avoid ID skipping 
    db.session.execute("ALTER SEQUENCE swimmers_swimmer_id_seq RESTART WITH {}".format(next_id + 1))
    db.session.commit()
    #This line returns a JSON response to the frontend after successfully adding a swimmer.
    return jsonify({"message": "Swimmer added successfully!", "Swimmer_ID": next_id}), 201


if __name__ == '__main__':
    app.run(debug=True)
