import datetime
from pprint import pprint


def json_processing(json: dict):
    """

    :param json:
    response received from the API for a request like
    GET ?day=<day>&month=<month>&year=<year>
    :return:
    date: 03-12-2012
    table:
    {
        "floor_2": [{"room": 3, "light": 0}, {"room": 3, "light": 0}, {"room": 4, "light": 1}],
        "floor_1": [{"room": 1, "light": 0}, {"room": 1, "light": 1}, {"room": 2, "light": 0}],
    }
    numberOfRoomsOnFloor: 2
    windowsOnTheFloor: [2, 1]

    numberOfRoomsInWhichTheLightIsOn: 2
    roomsWithLightsOn: [1, 4]
    """

    json = json["message"]

    date = json["date"]["data"]

    numberOfRoomsOnFloor = json["flats_count"]["data"]

    windowsOnTheFloor = json["windows_for_flat"]["data"]

    windowsOnTheFloorSum = sum(windowsOnTheFloor)

    windows = json["windows"]["data"]

    table = [{
        f"floor_{len(windows) - i}": [{"room": 0, "light": 0} for _ in range(windowsOnTheFloorSum)]
        for i in range(len(windows))
    }]

    roomsWithLightsOn = set()

    rooms = 1
    for floor in range(len(windows) - 1, -1, -1):
        window = 0

        for room in windowsOnTheFloor:
            for window_ in range(room):
                table[0][f"floor_{len(windows) - floor}"][window]["room"] = rooms
                table[0][f"floor_{len(windows) - floor}"][window]["light"] = int(windows[
                    f"floor_{len(windows) - floor}"
                ][window])

                if table[0][f"floor_{len(windows) - floor}"][window]["light"]:
                    roomsWithLightsOn.add(rooms)

                window += 1
            rooms += 1

    numberOfRoomsInWhichTheLightIsOn = len(roomsWithLightsOn)
    roomsWithLightsOn = sorted(list(roomsWithLightsOn))

    return (
        date,
        table,
        numberOfRoomsOnFloor,
        windowsOnTheFloor,
        numberOfRoomsInWhichTheLightIsOn,
        roomsWithLightsOn,
    )


if __name__ == '__main__':
    print(
        *json_processing(
            {'message': {'date': {'data': '25-01-23', 'description': 'Татьянин день'},
                         'flats_count': {'data': 3, 'description': 'Количество комнат на этаже'}, 'windows': {
                    'data': {'floor_1': [False, True, False, True, False, False],
                             'floor_2': [True, False, True, False, False, True],
                             'floor_3': [False, False, True, False, True, False],
                             'floor_4': [False, False, False, True, False, True]},
                    'description': 'Окна по этажам, в которых горит свет'}, 'windows_for_flat': {'data': [3, 2, 1],
                                                                                                 'description': 'Количество окон в каждой из комнат на этаже слева направо'}}}

        ),
        sep='\n',
    )
