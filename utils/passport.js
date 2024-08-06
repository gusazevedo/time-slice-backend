import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
        {

            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8000/auth/google/callback",
            passReqToCallback: true,
        },
        async function (request, accessToken, refreshToken, profile, done) {

            /*
               const exist = await User.findOne({ email: profile["emails"][0].value });
               if (!exist) {
                    await User.create({
                    email: profile["emails"][0].value,
                      fullName: profile["displayName"],
                      avatar: profile["photos"][0].value,
                      username: profile["name"]["givenName"],
                      verified: true,
                    });
                  }
                const user = await User.findOne({ email: profile["emails"][0].value });
             return done(null, user);
            */
            return done(null, profile);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});