import aixos from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export default (baseURL) => {
    return aixos.create({
        baseURL,
        ...commonConfig,
    });
};