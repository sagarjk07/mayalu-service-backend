const nodemailer = require('nodemailer');

exports.postMessageToSeller = async (req, res) => {
  const sendTo = req.body.listingDetail.userInfo.email;
  const output = `
    <p>You have a new message request</p>
    <p>************************************************************************</p>
    <h3>Buyer Details</h3>
    <ul>
      <li>Buyer Name: <b>${req.user.name}</b></li>
      <li>Buyer Email: <b>${req.user.email}</b></li>
    </ul>
    <p>************************************************************************</p>
    <h3>Product Details</h3>
    <ul>
      <li>Product ID: <b>${req.body.listingDetail._id}</b></li>
      <li>Product Name: <b>${req.body.listingDetail.title}</b></li>
      <li>Product Price: <b>${req.body.listingDetail.price}</b></li>
    </ul>
    <p>************************************************************************</p>
    <h3>Buyer Message</h3>
    <p>${req.body.message}</p>
    <p>************************************************************************</p>
    <h3>Seller Details</h3>
    <ul>
      <li>Seller Name: <b>${req.body.listingDetail.userInfo.name}</b></li>
      <li>Seller Email: <b>${req.body.listingDetail.userInfo.email}</b></li>
    </ul>
    <p>************************************************************************</p>

  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: 'sujitlibi@gmail.com',
      pass: 'T3chn0l0gy'
    },
    tls: {
      rejectUnauthorized: false
    }
  });


  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Mayalu Removal Service Notification" <mayalu.removal1@gmail.com>', // sender address
    to: sendTo, // list of receivers
    subject: 'Mayalu Removal Service Notification', // Subject line
    text: 'Contact', // plain text body
    html: output // html body
  };


  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // res.render('contact', { msg: 'Email has been sent' });
  });
  return res.status(200).send('Queries has been save successfully.');
}


