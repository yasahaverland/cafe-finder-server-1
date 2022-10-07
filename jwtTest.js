const jwt = require('jsonwebtoken')

const jwtTest = () => {
    try {
        // create a jwt payload -- the data that is encoded
        const payload = {
            // PUBLIC user information (do not put password here)
            name: 'Aimee',
            id: '1234',
            email: 'a@p.com'
            //do not put the password in the payload!
        }
        // 'sign' jwt by supplying a secret to hash in the signature
        const secret = 'my super big secret'
        // jwt.sign({ payload to encode }, 'secret to create signature', { options (expiresIn) })
        const token = jwt.sign(payload, secret)
        console.log(token)
        // head (specifies encoding standard for the jwt): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        // payload (encoded data): eyJuYW1lIjoiQWltZWUiLCJpZCI6IjEyMzQiLCJlbWFpbCI6ImFAcC5jb20iLCJpYXQiOjE2NjUwODIyNDZ9.
        // signature (hash of the payload and secret): NtVUzSHDkuynoXIGMe0fEbmbkiafZEEdLm00iCK70A8


        // signing a token will log a user in 
        // jwt.verify(token, 'secret') -- throws an error if it cannot verify (otherwise it returns the decoded data to us )
        // the secret below is "taco"
        const decode = jwt.verify(token, secret)

        // when we decode jwts, we will check the signature to make sure the user's login is valid, this authorizes the user
        console.log(decode)
    } catch(err) {
        console.log(err)
    }
}

jwtTest()