require('dotenv').config();
const mongoose = require('mongoose');
const Drone = require('../models/Drone');

const initialDrones = [
  {
    model: "DJI Mavic Air 2",
    brand: "DJI",
    imageUrl: "https://aerocamaras.es/wp-content/uploads/2022/05/DJI-Air-2s-abierto.jpg", //folded: https://aerocamaras.es/wp-content/uploads/2022/05/DJI-Air-2s-cerrado.jpg wallpaperSize: https://d500.epimg.net/cincodias/imagenes/2018/08/23/gadgets/1535040979_565258_1535041311_noticia_normal_recorte1.jpg
    specs: {
      maxFlightTime: 34,
      maxSpeed: 68.4,
      range: 6.2,
      weight: 570,
      dimensions: "180 x 97 x 84 mm"
    }
  },
  {
    model: "Parrot Anafi",
    brand: "Parrot",
    imageUrl: "https://i.pcmag.com/imagery/reviews/03PFj9d5ZpcOZmd7fYjYJ0o-16.fit_scale.size_1028x578.v1569481934.jpg", 
      maxFlightTime: 25,
      maxSpeed: 55,
      range: 4,
      weight: 320,
      dimensions: "180 x 75 x 55 mm"
    
  },
  {
    model: "Autel Robotics EVO II",
    brand: "Autel Robotics",
    imageUrl: "https://i.pcmag.com/imagery/reviews/00x599xV1C4y6W9mmaZcYNC-1.fit_scale.size_1028x578.v1618610194.jpg",
    specs: {
      maxFlightTime: 40,
      maxSpeed: 45,
      range: 7,
      weight: 790,
      dimensions: "268 x 230 x 107 mm"
    }
  },
  {
    model: "Skydio 2",
    brand: "Skydio",
    imageUrl: "https://viatea.es/wp-content/uploads/2019/10/Skydio-2.jpg", // PNG: https://cdn.sanity.io/images/mgxz50fq/production/ee609313730dedabc3441e4d69dd91920ce2d1ac-4396x1557.png sunny: https://i.pcmag.com/imagery/articles/007OA2B4sgWBzkv0paQoJ2i-2.fit_lim.size_768x.jpg
    specs: {
      maxFlightTime: 23,
      maxSpeed: 36,
      range: 3,
      weight: 740,
      dimensions: "218 x 172 x 92 mm"
    }
  },
  {
    model: "PowerVision PowerEye",
    brand: "PowerVision",
    imageUrl:"https://www.powervision.me/images/pv_specs_img/eye_img_slices/img.png", //landscape bg : https://www.powervision.me/images/pv_specs_img/eye_img_slices/img.png
    specs: {
      maxFlightTime: 40,
      maxSpeed: 55,
      range: 7,
      weight: 1180,
      dimensions: "410 x 310 x 140 mm"
    }
  },
  {
      model: "Yuneec Typhoon H Plus",
      brand: "Yuneec",
      imageUrl: "https://dronebelow.com/wp-content/uploads/2018/06/TyphoonHPlus-Yuneec-05348.jpg", // landscape-bg:https:www.drones-magazin.de/wp-content/uploads/Typhoon_01a-900x400-1.jpg   Snow landscpape-bg:https://controldron.com/wp-content/uploads/2023/01/Typhoon-intel-realsense.jpeg forest landscape -bg:https://controldron.com/wp-content/uploads/2023/01/dron-yuneec-typhoon-H-Plus.jpeg flying: https://i.pcmag.com/imagery/reviews/05dazeoMotZdEE4PMn3uNey-10.fit_scale.size_1028x578.v1569479883.jpg  red table-bg: https://www.cnet.com/a/img/resize/a52fb5786b91cb3ccb0268e7d71573c7bfcec69e/hub/2016/11/02/67782876-47c9-4573-9296-36f2bcfd8a5a/yuneec-typhoon-h-04.jpg?auto=webp&width=1200
      specs: {
      maxFlightTime: 25,
      maxSpeed: 43,
      range: 6,
      weight: 1500,
      dimensions: "450 x 453 x 258 mm"
      }
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Drone.create(initialDrones);
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  });
