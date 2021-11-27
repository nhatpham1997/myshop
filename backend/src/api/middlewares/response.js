const responseSender = ({ data, message = "Successfully" }) => {
    const res = {};
    res.data = data || null;
    res.success = true;
    res.message = message;
    return res;
};
module.exports = {
    responseSender,
};