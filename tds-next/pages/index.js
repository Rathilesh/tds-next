import { getSession, signIn, signOut } from "next-auth/client";
import Head from 'next/head';
import Link from "next/link";
import React, { useEffect } from "react";

const IndexPage = ({
  session,
}) => {

  useEffect(() => {



    const Script = document.createElement("script");
    //id should be same as given to form element

    var elementExists = document.getElementById("donateForm");
    if (elementExists) {

      const Form = document.getElementById('donateForm');
      Script.setAttribute('src', 'https://checkout.razorpay.com/v1/payment-button.js')
      Script.setAttribute('data-payment_button_id', 'pl_GxKRIgf1PJjIpf')
      Form.appendChild(Script);

    }


  }, [])

  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signin">
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </button>
        </Link>
      </div>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <div>


        <form id='donateForm'> </form>
        {/* <Link href="/about" alt="about"></Link> */}

        <Link href="/api/auth/signout">


          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >



            Sign Out

            {/* session.user.name */}
          </button>
        </Link>
      </div>
    );
  };

  if (!session) {
    return (
      <div className="hero">
        <div className="navbar">
          {signOutButtonNode()}
          {signInButtonNode()}
        </div>
        <div className="text">
          You aren't authorized to view this page
        </div>
      </div>
    )
  }

  return (
    <div className="hero">
      <Head>
        <title>Index Page</title>
      </Head>
      <div className="navbar">
        {signOutButtonNode()}
        {signInButtonNode()}
      </div>
      <div className="text">
        Hello world
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};

export default IndexPage;