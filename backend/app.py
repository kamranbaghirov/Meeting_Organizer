from settings import *
import json


db = SQLAlchemy(app)



class Meeting(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(80), nullable=False)
    # nullable is false so the column can't be empty
    participant = db.Column(db.String(80), nullable=False)
    start_time = db.Column(db.String(80), nullable=False)
    stop_time = db.Column(db.String(80), nullable=False)
    date = db.Column(db.String(80), nullable=False)


    def json(self):
        return {'id': self.id, 'subject': self.subject,
                'participant': self.participant, 'start_time': self.start_time,
                 'stop_time': self.stop_time, 'date': self.date}
    def add_meeting(_subject, _participant, _start_time,_stop_time,_date):

        new_meeting = Meeting(subject=_subject, participant=_participant, start_time=_start_time,stop_time=_stop_time,date=_date)
        db.session.add(new_meeting)
        db.session.commit()

    def get_all_meeting():
        return [Meeting.json(meeting) for meeting in Meeting.query.all()]

    def get_meeting(_id):
        return [Meeting.json(Meeting.query.filter_by(id=_id).first())]
        # Movie.json() coverts our output to the json format defined earlier
        # the filter_by method filters the query by the id
        # since our id is unique we will only get one result
        # the .first() method will get that first value returned

    def update_meeting(_id, _subject, _participant, _start_time,_stop_time,_date):

        movie_to_update = Meeting.query.filter_by(id=_id).first()
        movie_to_update.subject = _subject
        movie_to_update.participant = _participant
        movie_to_update.start_time = _start_time
        movie_to_update.stop_time = _stop_time
        movie_to_update.date = _date
        db.session.commit()

    def delete_meeting(_id):

        Meeting.query.filter_by(id=_id).delete()
        # filter movie by id and delete
        db.session.commit()  # commiting the new change to our database

