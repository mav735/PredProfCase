import datetime
from pprint import pprint


def json_processing(json: dict):
    """

    :param json:
    response received from the API for a request like
    GET /?day=<day>&month=<month>&<year>
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

    date = datetime.datetime.fromtimestamp(json["date"]["data"], datetime.UTC).strftime("%d-%m-%Y")

    numberOfRoomsOnFloor = json["rooms_count"]["data"]

    windowsOnTheFloor = json["windows_for_room"]["data"]

    windowsOnTheFloorSum = sum(windowsOnTheFloor)

    windows = json["windows"]["data"]

    table = {
        f"floor_{i + 1}": [{"room": 0, "light": 0} for _ in range(windowsOnTheFloorSum)]
        for i in range(len(windows))
    }
    rooms = 1
    for floor in range(len(windows) - 1, -1, -1):
        window = 0

        for room in windowsOnTheFloor:
            for window_ in range(room):
                table[f"floor_{len(windows) - floor}"][window]["room"] = rooms
                table[f"floor_{len(windows) - floor}"][window]["light"] = windows[
                    f"floor_{len(windows) - floor}"
                ][window]
                window += 1
            rooms += 1

    numberOfRoomsInWhichTheLightIsOn = 0
    roomsWithLightsOn = []

    return (
        date,
        table,
        numberOfRoomsOnFloor,
        windowsOnTheFloor,
        numberOfRoomsInWhichTheLightIsOn,
        roomsWithLightsOn,
    )


if __name__ == '__main__':
    true, false = 1, 0
    pprint(
        json_processing(
            {
                "date": {
                    "data": 1674594000,
                    "description": "Татьянин день"
                },
                "rooms_count": {
                    "data": 3,
                    "description": "Количество комнат на этаже"
                },
                "windows_for_room": {
                    "data": [
                        3,
                        2,
                        1
                    ],
                    "description": "Количество окон в каждой из комнат на этаже слева направо"
                },
                "windows": {
                    "data": {
                        "floor_1": [
                            false,
                            true,
                            false,
                            true,
                            false,
                            false
                        ],
                        "floor_2": [
                            true,
                            false,
                            true,
                            false,
                            false,
                            true
                        ],
                        "floor_3": [
                            false,
                            false,
                            true,
                            false,
                            true,
                            false
                        ],
                        "floor_4": [
                            false,
                            false,
                            false,
                            true,
                            false,
                            true
                        ]
                    },
                    "description": "Окна по этажам, в которых горит свет"
                }
            }
        )
    )
