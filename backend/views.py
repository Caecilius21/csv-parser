from rest_framework.decorators import api_view
from rest_framework.response import Response
import math
import numpy as np


def sinusoide(temps, amplitude, frequence):
    return amplitude * math.sin(frequence * temps / 100)


@api_view(['GET', 'POST'])
def graph(request):
    try:
        if request.method == 'GET':
            frequence = 10
            amplitude = 10
            temps = 10
        elif request.method == 'POST':
            inputs = request.data
            print(inputs)
            frequence = float(inputs['frequence'])
            amplitude = float(inputs['amplitude'])
            temps = float(inputs['temps'])

        categories = list(np.linspace(temps-50, temps+50, 1000))
        data = [sinusoide(t, amplitude, frequence) for t in categories]
        res = sinusoide(temps, amplitude, frequence)

        return Response({
            "categories": categories,
            "data": data,
            "res": res
        })
    except Exception as e:
        print(e)
        return Response({
            "categories": [],
            "data": [],
            "res": 'NA'
        })
