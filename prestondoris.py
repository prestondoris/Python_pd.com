from flask import Flask, render_template, url_for, request
from flask import redirect, flash, jsonify, make_response
app = Flask(__name__)

@app.route("/")
def resume():
    '''
    Main route for my resume page.
    '''
    return render_template('resume.html')



if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8080)
