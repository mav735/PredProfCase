import datetime


def json_processing(json: dict):
    """

    :param json:
    response received from the API for a request like
    GET /?day=<day>&month=<month>&<year>
    :return:
    date: 03.12.2012
    table:
    [
        [{"room": 3, "light": False}, {"room": 3, "light": False}, {"room": 4, "light": True}],
        [{"room": 1, "light": False}, {"room": 1, "light": True}, {"room": 2, "light": False}],
    ]
    numberOfRoomsOnFloor: 2
    windowsOnTheFloor: [2, 1]

    numberOfRoomsInWhichTheLightIsOn: 2
    roomsWithLightsOn: [1, 4]
    """
