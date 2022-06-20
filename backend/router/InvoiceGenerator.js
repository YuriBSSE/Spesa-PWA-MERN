const express = require('express');
const router = express.Router();
var easyinvoice = require('easyinvoice');
 
const nodemailer = require('nodemailer');

getDate=()=>{
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`
}

getTime=()=>{
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`
}

getData = (id, itemList) => {
  // console.log("=======================================",itemList, "=================================================================================")
  var data = {
      "documentTitle": "Spesa Email Receipt", //Defaults to INVOICE
      //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
      "currency": "USD", //See documentation 'Locales and Currency' for more info
      // "taxNotation": "vat", //or gst
      "marginTop": 25,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
      "logo": "https://i.ibb.co/FnmzSdq/receipt-Logo.png", //or base64
      //"background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf
      "sender": {
          "company": "UBC Campus Fresh Inc | Spesa Grocery",
          "address": "613 University Blvd",
          "zip": "Vancouver",
          "city": "BC V6T 1Z1",
          "country": "CANADA"
          //"custom1": "custom value 1",
          //"custom2": "custom value 2",
          //"custom3": "custom value 3"
      },
      "settings": {
        "currency": "USD",
        // "tax-notation": "vat",
        "margin-top": 50,
        "margin-right": 50,
        "margin-left": 50,
        "margin-bottom": 25
      },
      "information": {
        "number": id,
        "date": getDate(),
        "due-date": getDate()
      },
      "images": {
        "logo": "https://i.ibb.co/FnmzSdq/receipt-Logo.png",
      },
      // "client": {
      //    	"company": "Client Corp",
      //    	"address": "Clientstreet 456",
      //    	"zip": "4567 CD",
      //    	"city": "Clientcity",
      //    	"country": "Clientcountry"
          //"custom1": "custom value 1",
          //"custom2": "custom value 2",
          //"custom3": "custom value 3"
      // },
      "invoiceNumber": id,
      "invoiceDate": getDate(),
      "products": itemList.map(item => {
          return {
              "quantity": item.amount,
              "description": item.name,
              "price": item.price,
              "tax-rate": 12,
          }
        }
      ),  
      "bottomNotice": "Thank you for shopping with us",
      //Used for translating the headers to your preferred language
      //Defaults to English. Below example is translated to Dutch
      // "translate": { 
      //     "invoiceNumber": "Factuurnummer",
      //     "invoiceDate": "Factuurdatum",
      //     "products": "Producten", 
      //     "quantity": "Aantal", 
      //     "price": "Prijs",
      //     "subtotal": "Subtotaal",
      //     "total": "Totaal" 
      // }
  };
  return data;
}
// hyfdYp-7roxka-xytced

// jutiunacgwqiigja
const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'spesareceipt@gmail.com',
    pass: 'jutiunacgwqiigja',
  },
  tls: {
    rejectUnauthorized: false
  }
});

//Create your invoice! Easy!
router.post('/', async function(req, res) {
  id= req.body.id;
  itemList= req.body.itemList;
  const result = await easyinvoice.createInvoice(getData(id, itemList));
  if(result!==null){
    const message = {
      from: "spesareceipt@gmail.com", // Sender address
      to: req.body.email, // recipients
      subject: "Spesa Email Receipt", // Subject line
      attachments: [
        {
          filename: "invoice.pdf",
          content: result.pdf,
          encoding: "base64",
        },
      ],
    };
    console.log("mail starting");
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log("sendMail error",err)
        } else {
          console.log("mail sent");
          res.sendJSON({
            "status" : true
          });  
        }
    });
  }
});

module.exports = router;