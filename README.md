# Estate Sale Inventory Application

This web app was built for personal use when a close friend's father passed away unexpectedly and she was made the executor of his estate. Since my friend is still in her mid-20s, as is the rest of our social circle, none of us had any first or even secondhand experience with estate management, nor the financial resources to outsource the labor of managing an estate. As a result, it fell to my friend and our friend group to come together to help her administrate the estate, whatever was needed. I created this estate sale inventory application on a rushed timeline in order to help catalogue the items for sale in deceased's home. We also used the app to track transactions during the sale which we, her friends, ran on a volunteer basis. 

## Demo

This version is not functional since it does not connect to my database in Atlas (MongoDB). 

If you would like to try out a demo version of the interface, please follow this link: https://estate-sale-tracker-demo-pg7u.vercel.app/

## Setup

If you would like to run this application locally, download the files and install all dependencies.

You will need to create your own MongoDB database*. Once that is complete, open the "server" folder. Navigate to the "api" folder and create your own .env file containing your own MONGO_URI and PORT variables. Alternatively, replace the .env variables directly inside the index.js file. 

*Refer to the usage section for more information on setting up your database.

## Usage

### Backend

To build a compatible database, you will need to follow the schema in the "models" folder within the "server" folders. In the models folder, you will find three files for three database schemas 1) itemForSale 2) transaction and 3) reservation. Reservations were not necessary for the sale we ran, so this functionality is not built out, but I would like to one day. You are welcome to build this feature for yourself and even push it to me for review. For now, this schema can be ignored.

Create two collections, one following the schema in itemForSale.js and one following the schema in transaction.js.

If you would like, you can use the following documents as samples:

itemForSale

{"_id":{"$oid":"651eea4e4abe5d74d7be36f5"},
"code":"A1",
"type":"Misc.",
"name":"Book",
"description":"Any book, hardcover or softcover. Stock number is an estimate. ",
"stickerPrice":{"$numberDecimal":"0.25"},
"stock: {"$numberInt":"782"},
"productOwner":"Kim",
"saleStatus":"Available",
"__v":{"$numberInt":"0"}}

transaction

{"_id":{"$oid":"6529ae6e3f0d6c66f30732d2"},
"purchaseInfo":
[{"itemID":{"$oid":"651eea4e4abe5d74d7be36f5"},
"quantity":{"$numberInt":"5"},
"price":{"$numberDecimal":"0.25"},
"_id":{"$oid":"6529ae6e3f0d6c66f30732d3"}}],
"totalPrice":{"$numberDecimal":"1.25"},
"formOfPayment":"Cash",
"createdAt":{"$date":{"$numberLong":"1697230446057"}},
"updatedAt":{"$date":{"$numberLong":"1697230446057"}},
"__v":{"$numberInt":"0"}}

To run, use the following script:

```bash
node server.js
OR
nodemon server.js
```

### Frontend 

Use the following script to start up the front end:

```bash
npm run dev
```


## Contributing

Pull requests are welcome.