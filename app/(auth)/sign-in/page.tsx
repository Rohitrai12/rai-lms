import SignInModule from "@/app/modules/auth/_sign-in/Module";
import { headers }   from "next/headers";
import { redirect }  from "next/navigation";
import { auth }      from "@/lib/auth";       // wherever you actually export `auth`

const SignInPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return <SignInModule />;
};

export default SignInPage;
