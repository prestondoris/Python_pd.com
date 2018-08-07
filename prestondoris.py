from flask import Flask, render_template, url_for, request
from flask import redirect, flash, jsonify, make_response
import json, requests

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
        apiKey = '&appid=3da34a83f84233570753c27d609311af'
        url = 'https://api.openweathermap.org/data/2.5/weather?q='
        city = request.form['city']
        requestURL = url + city + apiKey
        r = requests.post(requestURL)
        response = r.json()
        if r.status_code == 200:
            maxTemp = format(response['main']['temp_max']*(9/5)-459.67, '.1f')
            minTemp = format(response['main']['temp_min']*(9/5)-459.67, '.1f')
            weather = response['weather'][0]['description']
            strResponse = 'The weather in '+ city + ' will have a high of ' + maxTemp+ ' ˚F, a low of ' + minTemp + ' ˚F with ' + weather
            print(strResponse);
            return render_template('weather.html', strResponse = strResponse)
        else:
            flash("There was an error loading the city, please try again")
            strResponse = ''
            return render_template('weather.html', strResponse = strResponse)



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
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=8080)
