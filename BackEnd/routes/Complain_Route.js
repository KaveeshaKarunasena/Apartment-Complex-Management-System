const express = require('express');


const Router = express.Router();
const Complain_re = require("../modles/Complain_model")

//Add Complain
Router.route("/add").post((req, res) => {

    const owner_name = req.body.owner_name;
    const complain = req.body.complain;
    const Email = req.body.Email;
    const Select_Cat = req.body.Select_Cat;
    const Status = req.body.Status;
    const Complain_No = req.body.Complain_No;
    const Contact_No = req.body.Contact_No;

    const newComplain = new Complain_re({
        owner_name,
        complain,
        Email,
        Select_Cat,
        Status,
        Complain_No,
        Contact_No,
    })



    newComplain.save().then(() => {
        res.json("Complain Added")
    }).catch((err) => {
        console.log(err);
    })

})

//show Complain
Router.route("/").get((req, res) => {




    Complain_re.find().then((stock) => {

        res.json(stock)
    })
        //if not show erro
        .catch((err) => {
            console.log(err);
        })




})


//update Complain

Router.route("/update/:id").put(async (req, res) => {

    let CompID = req.params.id;

    const { owner_name, complain, Email, Select_Cat, Status, Complain_No, Contact_No } = req.body;




    const updateComp = {

        owner_name,
        complain,
        Email,
        Select_Cat,
        Status,
        Complain_No,
        Contact_No,

    }



    const update = await Complain_re.findByIdAndUpdate(CompID, updateComp)

        .then(() => {

            res.status(200).send({ status: "Complain updated" })

        })

        //if not show erro

        .catch((err) => {

            console.log(err);

            res.status(500).send({ status: "Updating Unsuccessful ", error: err.massage });




        })





})


// cart item delete - http://localhost:8070/cart/delete/--id---

Router.route("/delete/:id").delete(async (req, res) => {

    let CompID = req.params.id;

    await Complain_re.findByIdAndDelete(CompID)

        .then(() => {
            res.status(200).send({ status: "Complain deleteted" })
        })
        //if not show erro

        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Deleting Unsuccessful ", error: err.massage });
        })
})

//get id
Router.route("/get/:id").get(async (req, res) => {

    let CompID = req.params.id;

    await Complain_re.findById(CompID)

        .then((fetchedItem) => {
            res.status(200).send({ status: "Complain fetched ", fetchedItem })
        })

        //if not show erro

        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "error with fetching Complain", error: err.massage });
        })



})


module.exports = Router;
