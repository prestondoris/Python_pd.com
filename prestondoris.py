from flask import Flask, render_template, url_for, request
from flask import redirect, flash, jsonify, make_response

app = Flask(__name__)

@app.route("/", methods = ['GET', 'POST'])
def resume():
    '''
    Main route for my resume page.
    '''
    return render_template('resume.html')

@app.route("/yourApp")
def yourApp():
    return render_template('yourApp.html')

@app.route("/yourApp/your_app.html")
def yourAppRedirect():
    '''
    Route simply to redirect old url that current resume is linked
    to, to the new url
    '''
    return redirect(url_for('yourApp'))


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8080)
