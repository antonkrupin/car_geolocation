//координаты КПП
export const TEST_KPP_COORDS = [59.144393, 37.802666];

export const TEST_CAR_COORDS = [
  [59.145493, 37.902666],
  [59.144393, 37.882666],
  [59.155393, 37.716166],
  [59.144393, 37.842666],
];

//тестовое расстояние до КПП указывается в километрах
export const TEST_REGISTRATION_DISTANCE = 5;

export const TEST_PHONES = [
  '89062087761',
  '89114047953',
]

export const TEST_ORDERS = [
  {
    id: '89062087761',
    personalData: ["Крупин Антон Петрович", "6754443322"],
    orders: [
      {
        id: "410045634",
        status: 0,
        city: "Череповец",
        address: "г. Череповец, улица 8-го марта, дом 54",
        storage: "324-Череповец-М",
        enterDate: "12.02.24",
        loadingSlot: "11:00-16:00",
        carNumber: "a202aa",
        priority: "1",
      },
      {
        id: "410045635",
        status: 0,
        city: "Череповец",
        address: "г. Череповец, улица 8-го марта, дом 54",
        storage: "324-Череповец-М",
        enterDate: "12.02.24",
        loadingSlot: "11:00-16:00",
        carNumber: "м302ох",
        priority: "1",
      },
      {
        id: "410045636",
        status: 0,
        city: "Череповец",
        address: "г. Череповец, улица 8-го марта, дом 54",
        storage: "324-Череповец-М",
        enterDate: "12.02.24",
        loadingSlot: "11:00-16:00",
        carNumber: "м534ха",
        priority: "1",
      },
    ]
  },
  {
    id: '89114047953',
    personalData: ["Иванов Иван Иванович", "9034123098"],
    orders: [
      {
        id: "412245634",
        status: 0,
        city: "Череповец",
        address: "г. Череповец, улица 8-го марта, дом 54",
        storage: "324-Череповец-М",
        enterDate: "11.02.24",
        loadingSlot: "11:00-16:00",
        carNumber: "a202aa",
        priority: "1",
      },
      {
        id: "413345635",
        status: 1,
        city: "Череповец",
        address: "г. Череповец, улица 8-го марта, дом 54",
        storage: "324-Череповец-М",
        enterDate: "13.02.24",
        loadingSlot: "14:00-18:00",
        carNumber: "м302ох",
        priority: "1",
      },
      {
        id: "414445636",
        status: 0,
        city: "Череповец",
        address: "г. Череповец, улица 8-го марта, дом 54",
        storage: "324-Череповец-М",
        enterDate: "15.02.24",
        loadingSlot: "12:00-14:00",
        carNumber: "м534ха",
        priority: "1",
      },
    ]
  },
]

// тестовые фрахтовые заказы
/*export const TEST_ORDERS = {
  '89062087761': [
    ["Крупин Антон Петрович", "6754443322"],
    [
      {
        id: "410045634",
        status: 0,
        city: "Череповец",
        address: "г. Череповец, улица 8-го марта, дом 54",
        storage: "324-Череповец-М",
        enterDate: "12.02.24",
        loadingSlot: "11:00-16:00",
        carNumber: "a202aa",
        priority: "1",
      },
      {
        id: "410045635",
        status: 0,
        city: "Череповец",
        address: "г. Череповец, улица 8-го марта, дом 54",
        storage: "324-Череповец-М",
        enterDate: "12.02.24",
        loadingSlot: "11:00-16:00",
        carNumber: "м302ох",
        priority: "1",
      },
      {
        id: "410045636",
        status: 0,
        city: "Череповец",
        address: "г. Череповец, улица 8-го марта, дом 54",
        storage: "324-Череповец-М",
        enterDate: "12.02.24",
        loadingSlot: "11:00-16:00",
        carNumber: "м534ха",
        priority: "1",
      },
    ],
  ],
  '89114047953': [
    ["Иванов Иван Иванович", "9034", "123098"],
    [
      ["420045634", "Не зарегистрирован", "Череповец"],
      ["430045634", "Зарегистрирован", "Череповец"],
      ["440045633", "Зарегистрирован", "Череповец"],
    ],
  ],
};*/

// тестовые слоты времени для выпадающего списка при регистрации
export const TEST_TIME = [
  "06:00-08:00",
  "08:00-12:00",
  "12:00-15:00",
  "15:00-18:00",
  "18:00-20:00",
  "20:00-22:00",
];

// время для счетчика, на повторную отправку смс
export const TEST_COUNTER_VALUE = 20;
// тестовый код из смс
export const TEST_PHONE_CODE = "3456";
// генерация рандомного числа, для рандомной ошибки при регистрации
export const generateRandomNumber = () => Math.random();

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};
