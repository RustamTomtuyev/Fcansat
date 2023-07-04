from flask import Flask, render_template
from flask_socketio import SocketIO
import requests
from threading import Lock

import serial

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'donsky!'
socketio = SocketIO(app, cors_allowed_origins='*')

# Background Thread
thread = None
thread_lock = Lock()

# Configure the XBee port and baud rate
port = '/dev/ttyUSB0'
baud_rate = 9600

# Create a serial connection
ser = serial.Serial(port, baud_rate)

"""
Read data from the XBee module and send it to clients
"""
def read_xbee_data():
    a=[]
    while True:
        if ser.in_waiting > 0:
            data = ser.readline().decode().strip()
            data_list = data.split(',')  # Split the data by comma
            data_values = [value.strip('<>') for value in data_list]
            a.append(data_values)
            print(a)
            socketio.emit('updateSensorData', a)

# Serve root index file
@app.route('/')
def index():
    return render_template('index.html')

# Decorator for connect
@socketio.on('connect')
def connect():
    global thread
    print('Client connected')

    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(read_xbee_data)

@socketio.on('reset')
def reset(mes):
     
     print('Received message:', mes)

     socketio.emit('message_response', mes)
     ser.write(mes.encode())

     
# @socketio.on('motor1')
# # def reset(mes):
     
# #     #  print('Received message:', mes)

# #      socketio.emit('message_response', mes, broadcast=True)
# #      ser.write(mes.encode())


# Decorator for disconnect
@socketio.on('disconnect')
def disconnect():
    print('Client disconnected', requests.sid)

if __name__ == '__main__':
    socketio.run(app)
