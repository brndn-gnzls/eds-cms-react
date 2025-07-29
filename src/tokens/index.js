import buttonTokens from "./button-tokens.json";

const Brand = {
    Anthem: {
        button: {
            border: {
                ghost: {
                    default: buttonTokens["Brand/Anthem/button/border/ghost/default"].value,
                },
            },
            background: {
                primary: {
                    default: buttonTokens["Brand/Anthem/button/background/primary/default"].value,
                    hover: buttonTokens["Brand/Anthem/button/background/primary/hover"].value,
                    press: buttonTokens["Brand/Anthem/button/background/primary/press"].value,
                },
            },
            text: {
                primary: {
                    default: buttonTokens["Brand/Anthem/button/text/primary/default"].value,
                },
            },
            borderRadius: buttonTokens["Brand/Anthem/button/border/borderRadius"].value,
            padding: {
                large: buttonTokens["Brand/Anthem/button/padding/horizontal/large"].value,
                small: "8px 16px", // temporary fallback if needed
            },
            font: {
                size: buttonTokens["Brand/Anthem/button/font/size/large/single"].value,
                fontWeight: buttonTokens["Brand/Anthem/button/font/weight/large/single"].value,
            },
        },
    },

    HealthyBlue: {
        button: {
            border: {
                ghost: {
                    default: buttonTokens["Brand/HealthyBlue/button/border/ghost/default"].value,
                },
            },
            background: {
                primary: {
                    default: buttonTokens["Brand/HealthyBlue/button/background/primary/default"].value,
                    hover: buttonTokens["Brand/HealthyBlue/button/background/primary/hover"].value,
                    press: buttonTokens["Brand/HealthyBlue/button/background/primary/press"].value,
                },
            },
            text: {
                primary: {
                    default: buttonTokens["Brand/HealthyBlue/button/text/primary/default"].value,
                },
            },
            borderRadius: buttonTokens["Brand/HealthyBlue/button/border/borderRadius"].value,
            padding: {
                large: buttonTokens["Brand/HealthyBlue/button/padding/horizontal/large"].value,
                small: "8px 16px",
            },
            font: {
                size: buttonTokens["Brand/HealthyBlue/button/font/size/large/single"].value,
                fontWeight: buttonTokens["Brand/HealthyBlue/button/font/weight/large/single"].value,
            },
        },
    },

    Wellpoint: {
        button: {
            border: {
                ghost: {
                    default: buttonTokens["Brand/Wellpoint/button/border/ghost/default"].value,
                },
            },
            background: {
                primary: {
                    default: buttonTokens["Brand/Wellpoint/button/background/primary/default"].value,
                    hover: buttonTokens["Brand/Wellpoint/button/background/primary/hover"].value,
                    press: buttonTokens["Brand/Wellpoint/button/background/primary/press"].value,
                },
            },
            text: {
                primary: {
                    default: buttonTokens["Brand/Wellpoint/button/text/primary/default"].value,
                },
            },
            borderRadius: buttonTokens["Brand/Wellpoint/button/border/borderRadius"].value,
            padding: {
                large: buttonTokens["Brand/Wellpoint/button/padding/horizontal/large"].value,
                small: "8px 16px",
            },
            font: {
                size: buttonTokens["Brand/Wellpoint/button/font/size/large/single"].value,
                fontWeight: buttonTokens["Brand/Wellpoint/button/font/weight/large/single"].value,
            },
        },
    },
};

export default { Brand };