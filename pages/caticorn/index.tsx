import { useState, useEffect } from "react";
import { getServerSession } from "next-auth/next";
import type { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";

import { Button, Inputs, Text, Form } from "../../components";

import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { hideDash } from "../../redux/reducers/globalState";
import Image from "next/image";

const init = {
  state: {
    team: "",
    pId: "",
    input: "",
    loading: false,
  },
  form: {
    doggies: {
      findCat: "string",
      squid: 0,
      flamingo: 0,
      train: 0,
      bowling: 0,
      minus: 0,
    },
    unicornies: {
      findCat: 0,
      squid: 0,
      flamingo: 0,
      train: 0,
      bowling: 0,
      minus: 0,
    },
    giraffies: {
      findCat: 0,
      squid: 0,
      flamingo: 0,
      train: 0,
      bowling: 0,
      minus: 0,
    },
    bunnies: {
      findCat: 0,
      squid: 0,
      flamingo: 0,
      train: 0,
      bowling: 0,
      minus: 0,
    },
  },
};

const team = ["wolfies", "unicornies", "deeries", "caties"];

export default function CaticornPage(props: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [state, setState] = useState({ ...init.state });
  const [form, setForm] = useState({ ...init.form });

  const showDash: boolean = useAppSelector((s: any) => s.global.showDash);

  useEffect(() => {
    showDash && dispatch(hideDash());
  }, []);

  async function onSubmitPId(id: string) {
    router.push(`${router.pathname}/?pId=${id}`);
  }
  async function submitData(form: any, pId: string) {
    if (state.loading) {
      return;
    }

    console.log(form);
    console.log(pId);
  }
  async function uploadImage(blob: any) {
    if (state.loading) {
      return;
    }

    const { data }: any = axios.post("/api/caticorn/image", blob);

    console.log(data);
  }

  return props.pId && team.find((a) => a === props.pId) ? (
    <>
      <section>
        <header className="pc1b">We are on the {props.pId} page!</header>

        <main className="pc1b">
          <aside className="pc1b">
            <Text text="Scoreboard here" />
          </aside>

          <Form onSubmit={() => submitData(form, props.pId)}>
            <h4>form</h4>

            <Inputs type="file" />

            <Inputs
              label="answer one"
              value={form.doggies.findCat}
              onChange={(e: any) =>
                setForm({
                  ...form,
                  doggies: { ...form.doggies, findCat: e.target.value },
                })
              }
            />

            <Inputs type="image" />

            <Button text="submit your answers!" height="3rem" />
          </Form>
        </main>
      </section>

      <style jsx>{`
        section {
          height: 100%;
          width: 100%;
          min-height: 80vh;

          padding-top: 10vh;
        }

        main {
          width: 100%;
          max-width: 30rem;
          transition: 0.3s ease;
        }
        div {
          width: 100%;
          max-width: 20rem;

          display: grid;
          gap: 1rem;

          transition: 0.3s ease;
        }
      `}</style>
    </>
  ) : (
    <>
      <section>
        <main>
          <Form onSubmit={() => onSubmitPId(state.input)}>
            <Image
              src={
                "https://res.cloudinary.com/chansendesign/image/upload/v1683089676/caticorn_giqoso.png"
              }
              height={300}
              width={300}
              alt="Evil caticorn"
            />

            <Text
              text="Welcome to find the caticorn, have you found your secret key yet?"
              type="h4"
              className="sc"
            />

            <Inputs
              label="secret key"
              value={state.input}
              onChange={(e: any) =>
                setState({ ...state, input: `${e.target.value}`.toLowerCase() })
              }
            />
            <Button
              text="submit key"
              margin="2rem 0 0 0"
              onClick={() => onSubmitPId(state.input)}
            />

            {props.pId && (
              <Text
                text="Couldn't find this team, please try again"
                className="alert"
              />
            )}
          </Form>

          <Button text="init Data" onClick={() => postData(setForm)} />
        </main>
      </section>

      <style jsx>{`
        section {
          height: 100%;
          width: 100%;
          min-height: 80vh;

          display: flex;
          align-items: center;
          justify-content: center;
        }
        main {
          width: 30rem;
          max-width: 80vw;

          display: grid;
          gap: 1rem;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  let pId;
  if (context.query.pId) {
    pId = context.query.pId;
  }

  return {
    props: {
      pId: pId ? pId : "",
      cow: "cow",
      cookie: session,
    },
  };
}

async function fetchData(form: any, setForm: any) {
  const res = await axios.get("/api/caticorn");

  console.log(res);

  setForm({ ...form, ...res.data });
}

async function postData(setForm: any) {
  const res = await axios.post("/api/caticorn/post");

  console.log(res);

  setForm([...res.data]);
}

async function patchData(team: string, form: object, setForm: any) {
  const res = await axios.patch(`/api/caticorn/${team}`);

  console.log(res);

  setForm({ ...form, ...res.data });
}
