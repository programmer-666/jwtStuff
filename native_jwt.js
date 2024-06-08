import jsonwebtoken from "jsonwebtoken";
import { randomBytes } from "crypto";

const secret = randomBytes(512).toString("base64");

const createToken = (data) => {
    return jsonwebtoken.sign(
        {
            x: data,
        },
        secret,
        {
            issuer: "Server",
            subject: "TestToken",
            expiresIn: "1s",
            algorithm: "HS512",
        },
    );
};

const testData = {
    id: randomBytes(1).toString("hex"),
    rands: {
        r1: randomBytes(32).toString("hex"),
        r2: randomBytes(32).toString("hex"),
        r3: randomBytes(32).toString("hex"),
    },
};
const token = createToken(testData);
console.log(token, secret);

// try {
//     jsonwebtoken.verify(
//         "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ4Ijp7ImlkIjoiM2UiLCJyYW5kcyI6eyJyMSI6ImY2OGU2MTRkNzAxNjg5ZmU1YWYyMTg4YjA2YzAzMDQ5ZWQ0MzQ2YjYyYzZmYTU5NmUwZDlmNTdiY2I4NTFlN2IiLCJyMiI6Ijg1MmIyOWZlZTlmM2FiNDllYmI5NTFjZmE2MTgwNGM4YjJjZGVmMzViZjU1M2QxMDkyZmUwMGZjOGUzNTE4NDQiLCJyMyI6ImQyMTQ3ZmQxYjU1MzYzYTg2NmVmZWEwZGY3M2U4N2E3MjQ3Y2RiYTE3MTE1ZmUxZWY5MjMwNTQ2MDI1MGMwZTYifX0sImlhdCI6MTcxNzc0OTg0OSwiZXhwIjoxNzE3NzQ5ODUwLCJpc3MiOiJTZXJ2ZXIiLCJzdWIiOiJUZXN0VG9rZW4ifQ.bv1_LcdYfuEfyghV3zUzetE0d6GlBKg6Ltv5ej6aleN3qUdGNAnmqCr4bv_JaRjhCyUZll2WhICkfz3GY-nHQQ",
//         "sTPljIjnw08pPehxoQG8N2SD65kmTciZCCEqT9DXGivEqj+Q9521dGpwalFnR2tQjBP5LADO75rzOZYOeAA61nYoccPOHH1Wq3rNzgm42c01ko6kGOmEZyjbr2JwChfMThUVkUIvVrMfow02sabTzfMlprzvMkSDNYlv7i0pkzA/UN4tehKPJPW8Cm65XuPYwF9LDGsVUDZBPw0jhSvLxMHyx3UWdv4rrHC6ckrgIt4VO9LQjYmBd1WebD0gsJsaVoDeV3+OtRMpT7e0N9AIGIWVsPfP23sUR1KPSQAJ8Lq8XJIdtWqoky17ZKG0q5S6QE8UohbAN+tuxKLAjGSWmbVG+k8R7/Oy5OF8cnnneuhoqtBnhL66Ckd1epNtF3MFWToDxBGGTS6RsoRz/yA4T2ncEHA6y158gv22wTnTTYkOi5qHrSVOhLKFij+w+3KUTlFZNlYoHQ54U+BkGscoHH2gUqRIZSEp3Cc/Pcv3b6wEl+Pf3m8sWmtqERDra5I8EzUTaJaipCau9OAS2eBEHnW0YLEu44SUZB97Ya+Jk8ffIXs1AZIT0Ra4o0FRz6KwOL34maanarxQdGTM1C/wCgwVt7PoDI1Pww444EC+onJsI1UgW49IOPCB0507q9rTw6gmjdmdEtHjvHEgofD4oYLzvUbFHzjlMHoKmKtRjbs=",
//         { algorithms: ["HS512"] },
//     );
// } catch (Err) {
//     console.error(Err);
// } finally {
//     console.info("[i] Token Expired.");
// }

console.log("hi");
