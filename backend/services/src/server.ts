//Create App with options
import {app} from './app';
require("dotenv").config();
// ajout de socket.io

// const appId = 1111;

const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: ["https://cesi.elective.dev.fradetaxel.fr","https://cesi.socket.fradetaxel.fr"],
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
},
allowEIO3: true
});


io.on('connection',  function(socket: any) {
  console.log(socket.id)
  console.log("quelqu'un se connecte")
  socket.on('OrderPaid', (msg : any) => {
      console.log('OrderPaid')
      console.log(msg)
      socket.emit('OrderIsPaid', {
          'Customer' : 'Your order ' + msg.message + ' starting cooking !',
          'Restorer' : 'Order ' + msg.message + ' is paid, let\'s start cooking !'
      });
  });
  socket.on('OrderReady', (msg : any) => {
      console.log('OrderReady')
      socket.emit('OrderIsReady', {
          'Customer' : 'Your order ' + msg.id + ' is ready for deliveryMan !',
          'DeliveryMan' : 'The order' + msg.id + ' is ready to be taken !'
      });
  });
  socket.on('OrderValidate', (msg : any) => {
      console.log('OrderValidate')
      socket.emit('OrderIsValidate',{
          'Customer' : 'Your order ' + msg.id + ' is in charge by a deliveryMan, your food coming soon !',
          'Restorer' : 'The order ' + msg.id + ' is in charge by a deliveryMan'
      });
  });
  socket.on('OrderStart', (msg : any) => {
      console.log('OrderStart')
      socket.emit('OrderIsStart',{
          'Customer' : 'DeliveryMan with order ' + msg.id + ' has started to come to your house !',
          'Restorer' : 'DeliveryMan with order ' + msg.id + ' has started to go'

      });
  });
  socket.on('OrderFinish', (msg : any) => {
      socket.emit('OrderIsFinish', {
          'Customer' : 'DeliveryMan with order ' + msg.id + ' is in front of your door, come get your meals !',
          'Restorer' : 'DeliveryMan with order ' + msg.id + ' has correctly deliver the order'
      });
  });
});

const appId = process.env.APPID;

server.listen(appId, () => {
  return console.log(`server is listening on ${appId}`);
});
