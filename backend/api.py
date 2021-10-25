from app import *
import json


# route to get all meeting
@app.route('/meeting', methods=['GET','OPTIONS'])
def get_meeting():

    response=jsonify({'Meeting': Meeting.get_all_meeting()})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# route to get meeting by id
@app.route('/meeting/<int:id>', methods=['GET'])
def get_movie_by_id(id):
    return_value = Meeting.get_meeting(id)
    return jsonify(return_value)


# route to add new meeting
@app.route('/meeting', methods=['POST'])
def add_meeting():
    request_data = request.get_json()  # getting data from client
    Meeting.add_meeting(request_data["subject"],
                    request_data["participant"],
                    request_data["start_time"],
                    request_data["stop_time"],
                    request_data["date"])
    response = Response("Meeting added", 201, mimetype='application/json')
    return response

# route to update meeting with PUT method
@app.route('/meeting/<int:id>', methods=['PUT'])
def update_meeting(id):
    request_data = request.get_json()
    Meeting.update_meeting(id,
                           request_data["subject"],
                           request_data["participant"],
                           request_data["start_time"],
                           request_data["stop_time"],
                           request_data["date"])
    response = Response("Meeting Updated", status=200, mimetype='application/json')
    return response

# route to delete meeting using the DELETE method
@app.route('/meeting/<int:id>', methods=['DELETE'])
def remove_meeting(id):
    Meeting.delete_meeting(id)
    response = Response("Meeting Deleted", status=200, mimetype='application/json')
    return response

if __name__ == "__main__":
    app.run(port=1234, debug=True)

