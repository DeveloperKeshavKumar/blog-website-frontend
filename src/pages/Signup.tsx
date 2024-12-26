import Quote from "../components/Quote";
import Auth from "../components/Auth";

const signup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Auth type="signup"/>
      </div>
      <div className="hidden md:block">
        <Quote />
      </div>
    </div>
  );
};

signup.propTypes = {};

export default signup;
