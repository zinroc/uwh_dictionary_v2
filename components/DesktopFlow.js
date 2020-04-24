import { css } from 'emotion';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  SELECT_PHASE_OPTION,
  SELECT_PHASE_KEY,
  SELECT_PHASE_CARD
} from '../redux/modules/main';
import PhaseInfo from '../data/phase';

const DesktopFlowChart = () => {
  const dispatch = useDispatch();

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

  const selectedPhasePucks = useSelector(state => {
    if (!state.main.selectedPhaseOption) return null;

    let s_pucks = [];
    PhaseInfo.Pucks.map(pps => {
      if (pps.phase === state.main.selectedPhaseOption.id) s_pucks = pps.pucks;
      return true;
    })
    console.log({s_pucks})
    return s_pucks;
  })


  return (
    <div className={css`
      position: relative;
      @media (max-width: 1000px) {
        display: none;
      }`
    }>
      <div>
        <div className={css`
          position: absolute;
          width: 100%;
          height: 600px;

          `
        }>
          {PhaseInfo.Phase_Options.map(phaseOption => {
            if (phaseOption.id === 4 || phaseOption.id === 3) return null; // don't show eliminate opposing player since its same spot as puck collection
            return (
              <input
                key={`${phaseOption.id}-phase-option`}
                type="button"
                className={css`
                  border: red solid ${selectedPhaseOption === phaseOption.id ? '4px' : '1px'};
                  border-radius: 50%;
                  width: ${phaseOption.width}%;
                  height: ${phaseOption.height}%;
                  top: ${phaseOption.y}%;
                  left: ${phaseOption.x}%;
                  position: relative;
                  cursor: pointer;
                  background-color: rgba(255, 255, 255, 0.5);
                  :hover {
                    background-color: rgba(255, 217, 217, 0.75);  
                  }
                `}
                onClick={() => dispatch({
                  type: SELECT_PHASE_OPTION,
                  phaseOption: phaseOption
                })}
              />);
          })}
        </div>
        <img src="/images/Underwater_Hockey.png" width="1000px" />
      </div>
      {selectedPhaseOption && (
        <div>
          <div className={css`
            position: absolute;
            width: 100%;
            height: ${selectedPhaseOption.panel_height}px;
            `
          }>
            {selectedPhaseOption.super_phases.map(superPhase => (
                <input
                  key={`${superPhase.id}-super-phase`}
                  type="button"
                  className={
                    css`
                      border: red solid 1px;
                      height: 200px;
                      width: 200px;
                      left: ${superPhase.x}px;
                      top: ${superPhase.y}px;
                      border-radius: 50%;
                      position: absolute;
                      cursor: pointer;
                      background-color: rgba(255, 255, 255, 0.5);
                      :hover {
                        background-color: rgba(255, 217, 217, 0.75);  
                      }
                      z-index: 1000;
                    `
                  }
                  onClick={() => dispatch({
                    type: SELECT_PHASE_OPTION,
                    phaseOption: PhaseInfo.Phase_Options[PhaseInfo.Phase_Options.findIndex(po => po.id === superPhase.id)]
                  })}
                />
              ))}

            {selectedPhasePucks.map(puck => (
                <div
                  className={css`
                    position: absolute;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    background-color: #1e1e1e;
                    border: solid 20px #ea3f3f;
                    color: white;
                    font-size: 25px;
                    text-align: center;
                    display: inline-block;
                    left: ${puck.pin.x}px;
                    top: ${puck.pin.y}px;
                    vertical-align: top;
                  `}
                >
                  <div
                    className={
                      css`
                        padding: 25px;
                        position: absolute;
                      `
                    }
                  >
                    {puck.name.replace(/_/g, " ")}
                  </div>
                  {puck.tracks.map(track => (
                    <div
                      key={`${puck.id}-track-${JSON.stringify(track)}`}
                      className={css`
                        position: absolute;
                        background-color: red;
                        width: 50px;
                        z-index: -1;
                        height: ${track.length}px;
                        top: ${track.pin.y + 100}px;
                        left: ${track.pin.x + 50}px;
                        transform: rotate(${track.rotation}deg);
                      `}
                    />
                  ))}
                  {puck.arrows.map(arrow => (
                    <div key={`${puck.id}-arrow-${JSON.stringify(arrow)}`}>
                      <div
                        className={css`
                            width: 0; 
                            height: 0;
                            border-left: ${arrow.direction === 'up' ?
                              '50px solid transparent' :
                              arrow.direction === 'down' ? 
                              '50px solid transparent' :
                              arrow.direction === 'left' ?
                              undefined :
                              '50px solid red;'};
                            border-right: ${arrow.direction === 'up' ?
                              '50px solid transparent' :
                              arrow.direction === 'down' ? 
                              '50px solid transparent' :
                              arrow.direction === 'left' ?
                              '50px solid red' :
                              undefined};
                            border-bottom: ${arrow.direction === 'up' ?
                              '50px solid red' :
                              arrow.direction === 'down' ? 
                              undefined :
                              arrow.direction === 'left' ?
                              '50px solid transparent' :
                              '50px solid transparent;'};
                            border-top: ${arrow.direction === 'up' ?
                              undefined :
                              arrow.direction === 'down' ? 
                              '50px solid red' :
                              arrow.direction === 'left' ?
                              '50px solid transparent' :
                              '50px solid transparent;'};
                            position: absolute;
                            left: ${arrow.direction === 'up' ?
                              '25px' :
                              arrow.direction === 'down' ?
                              '25px':
                              arrow.direction === 'left' ?
                              '-100px' :
                              '200px'};
                            top: ${arrow.direction === 'up' ?
                              '-100px' :
                              arrow.direction === 'down' ?
                              '215px':
                              arrow.direction === 'left' ?
                              '25px' :
                              '25px'};
                          `}
                      />
                        
                      {arrow.mini_track && <div
                          className={css`
                              left: ${arrow.mini_track.pin.x}px;
                              top: ${arrow.mini_track.pin.y}px;
                              height: ${arrow.mini_track.height}px;
                              background-color: red;
                              width: 10px;
                              border: 1px;
                              position: absolute;
                              z-index: 999;
                            `}
                        />}
                      {arrow.subtitle && (
                        <div
                          className={css`
                              left: ${arrow.subtitle.pin.x}px;
                              top: ${arrow.subtitle.pin.y}px;
                              color: red;
                              text-decoration: underline;
                              position: absolute;
                              font-weight: 900;
                              font-size: 36px;
                            `}
                        >
                          {arrow.subtitle.name.replace(/_/g, " ")}
                      </div>)}
                    </div>))}
                  
                </div>
              ))}

            {/*selectedCards.map(card => (
              <div
                key={card.title.concat(card.decision)}
                className={css`
                  position: absolute;
                  left: ${card.pin.x}px;
                  top: ${card.pin.y}px;
                `}
              >
                {selectedPhaseKeys.map(pKey => {
                  if (pKey.card !== card.title || pKey.decision !== card.decision) return null;

                  return (
                    <input
                      key={`${pKey.id}-phase-key`}
                      className={css`
                          position: relative;
                          display: block;
                          height: ${pKey.height || '27px'};
                          width: 250px;
                          border-left: 0px;
                          border-top: 0px;
                          border-bottom: 0px;
                          border-right: 0px;
                          border-${card.border}: red solid 1px;
                          cursor: ${pKey.active ? 'pointer' :'not-allowed'};
                          top: ${pKey.top || '0px'};
                          background-color: rgba(255, 217, 255, 0.5);
                          :hover {
                            background-color: rgba(255, 217, 217, 0.75);
                          }
                        `}
                        onClick={() => {
                            dispatch({
                              type: SELECT_PHASE_KEY,
                              phaseKey: pKey
                            })
                            dispatch({
                              type: SELECT_PHASE_CARD,
                              phaseCard: card,
                            })
                          }
                        }
                        disabled={!pKey.active}
                    />)
                })}


              </div>))*/}
        </div>
        {/* <img src={`/images/${selectedPhaseOption.name}.png`} width="1000px" /> */}
      </div>)}
    </div>
  );
}

export default DesktopFlowChart;