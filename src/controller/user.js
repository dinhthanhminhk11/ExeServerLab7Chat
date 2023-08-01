import user from "../models/user";


class User {

    async loginAndRegister(req, res) {
        try {
            console.log(req.body.name)
            console.log(req.body.email)
            const checkMail = await user.findOne({ name: req.body.name, email: req.body.email })
            if (!checkMail) {
                const dataUser = {
                    name: req.body.name,
                    email: req.body.email
                };
                const result = await new user(dataUser).save();

                if (result) {
                    return res.status(200).json(result);
                }
            }
            if (checkMail) {
                return res.status(200).json(checkMail);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    }
}

export default new User();