from flask import Flask, render_template, url_for, request
from flask import redirect, flash, jsonify, make_response
import httplib2, ast, json

app = Flask(__name__)

@app.route("/", methods = ['GET', 'POST'])
def resume():
    '''
    Main route for my resume page.
    '''
    return render_template('resume.html')


@app.route("/YourApp")
def yourApp():
    return render_template('yourApp.html')


@app.route("/YourApp/your_app.html")
def yourAppRedirect():
    '''
    Route simply to redirect old url that current resume is linked
    to, to the new url
    '''
    return redirect(url_for('yourApp'))


@app.route('/Weather', methods=['GET', 'POST'])
def weather():
    if request.method == 'GET':
        return render_template('weather.html')
    elif request.method == 'POST':
        h = httplib2.Http()
        apiKey = '&appid=3da34a83f84233570753c27d609311af'
        url = 'https://api.openweathermap.org/data/2.5/weather?q='
        city = request.form['city']
        requestURL = url + city + apiKey
        response, status = h.request(requestURL, 'GET')
        if status == 200:
            # do something
            return render_template('weather.html')
        else:

            return render_template('weather.html')



@app.route('/ColorGame')
def colorGame():
    return render_template('color.html')


@app.route('/ColorGame/color.html')
def colorGameRedirect():
    return redirect(url_for('colorGame'))


@app.route('/NeighborhoodMap')
def map():
    return render_template('map.html')


@app.route('/NeighborhoodMap/index.html')
def mapRedirect():
    return redirect(url_for('map'))


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8080)
