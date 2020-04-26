import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { css } from 'emotion';

import PhaseInfo from '../data/phase';
import SearchBar from '../components/SkillSearchBar';
import DesktopFlowChart from '../components/DesktopFlow';
import MobileFlowChart from '../components/MobileFlow';
import Modal from '../components/SkillModal';

import {
  SELECT_PHASE_OPTION,
  SELECT_PHASE_KEY,
} from '../redux/modules/main';

const Home = () => {
  const dispatch = useDispatch();
  const selectedPhaseKey = useSelector(state => state.main.selectedPhaseKey);

  const selectedPhaseOption = useSelector(state => state.main.selectedPhaseOption);
  const selectedCards = useSelector(state => {
    if (!state.main.selectedPhaseOption) return null;

    let s_cards = [];
    PhaseInfo.Cards.map(c => {
      if (c.phase === state.main.selectedPhaseOption.id) s_cards = [...c.cards];
      return true;
    })
    return s_cards;
  })

  const selectedPhaseKeys = useSelector(state => {
    if (!state.main.selectedPhaseOption) return null;

    let s_keys = [];
    PhaseInfo.Phase_Keys.map(pks => {
      if (pks.phase === state.main.selectedPhaseOption.id) s_keys = pks.keys;
      return true;
    })
    return s_keys;
  })

  useEffect(() => {

    if (window.location.href.includes("&key=") && window.location.href.includes("?phase=")) {
      
      const phaseId = parseInt(window.location.href.split("?phase=")[1].split("&key=")[0], 10);
      const phaseKeyId = parseInt(window.location.href.split("?phase=")[1].split("&key=")[1], 10);
      const phaseIndex = PhaseInfo.Phase_Options.findIndex(po => po && po.id === phaseId);
      if (phaseIndex !== -1) {
        const phase = PhaseInfo.Phase_Options[phaseIndex];
        const phaseKeysIndex = PhaseInfo.Phase_Keys.findIndex(pks => pks.phase === phaseId);
        const phaseKeys = PhaseInfo.Phase_Keys[phaseKeysIndex];
        const phaseKeyIndex = phaseKeys.keys.findIndex(pk => pk.id === phaseKeyId);
        if (phaseKeyIndex !== -1)
        {
          const phaseKey = phaseKeys.keys[phaseKeyIndex];
          dispatch({
            type: SELECT_PHASE_OPTION,
            phaseOption: phase
          })
          dispatch({
            type: SELECT_PHASE_KEY,
            phaseKey: phaseKey
          })
        }
      }
    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Underwater Hockey Dictionary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={css`
            width: 100%;
            @media (max-width: 330px) {
              width: 100vw;
            }
        `}>
          <h3> If you know the name of the technique <br /> Search for it here:</h3>
          <SearchBar />
          <h3>Otherwise, look for it in the contextual flow chart below</h3>

          <DesktopFlowChart
            selectedPhaseOption={selectedPhaseOption}
            selectedCards={selectedCards}
            selectedPhaseKeys={selectedPhaseKeys}
          />
          <MobileFlowChart
            selectedPhaseOption={selectedPhaseOption}
            selectedCards={selectedCards}
            selectedPhaseKeys={selectedPhaseKeys}
          />
          <Modal />
        </div>
      </main>

      <footer>

      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        h3 {
           word-wrap: break-word;
        }
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Home;