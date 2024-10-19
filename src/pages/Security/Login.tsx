import Card from "../../components/Common/Card";
import LoginForm from "../../components/Security/LoginForm";
import { Helmet } from "react-helmet";
import useBrand from "../../hook/useBrand";
import SchemaDefault from "../../components/Layouts/SchemaDefault";

const Login = () => {
  const { theme } = useBrand();
  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen ${theme}`}
    >
      <Helmet>
        <title>Nick Knack Dr!</title>
      </Helmet>

      <SchemaDefault showPlastas={true} />

      <main>
        <Card extraClasses="w-full mx-2 p-8 lg:w-[500px] border border-site-primary">
          <div className="">
            <LoginForm />
          </div>
        </Card>
      </main>
    </main>
  );
};

export default Login;
