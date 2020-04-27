import { css } from 'emotion';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import toTitleCase from '../helpers';

import {
  SELECT_PHASE_OPTION,
  SELECT_PHASE_KEY,
} from '../redux/modules/main';
import PhaseInfo from '../data/phase';

const DesktopFlowChart = ({selectedPhaseOption, selectedCards, selectedPhaseKeys}) => {
  const dispatch = useDispatch();

  const selectedPhaseKey = useSelector(state => state.main.selectedPhaseKey);

  const selectedPhasePucks = useSelector(state => {
    if (!state.main.selectedPhaseOption) return null;

    let s_pucks = [];
    PhaseInfo.Pucks.map(pps => {
      if (pps.phase === state.main.selectedPhaseOption.id) s_pucks = pps.pucks;
      return true;
    })
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
          <h1>{toTitleCase(selectedPhaseOption.display_name)}</h1>
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
                        background-color: rgba(255, 255, 255, 0.5);
                        :hover {
                          background-color: rgba(255, 217, 217, 0.75);  
                        }
                        cursor: pointer;
                        height: 200px;
                        width: 200px;
                        left: ${superPhase.x}px;
                        top: ${superPhase.y}px;
                        border-radius: 50%;
                        position: absolute;
                        z-index: ${selectedPhaseKey ? 0 : 1};
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
                    key={puck.name}
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
                      {toTitleCase(puck.name)}
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
                            {toTitleCase(arrow.subtitle.name)}
                        </div>)}
                      </div>))}
                    
                  </div>
                ))}

              {selectedCards.map(card => (
                <div
                  key={card.title.concat(card.decision)}
                  className={css`
                    position: absolute;
                    left: ${card.pin.x}px;
                    top: ${card.pin.y}px;
                  `}
                >
                  <h2>{toTitleCase(card.title)}</h2>
                  {selectedPhaseKeys.map(pKey => {
                    if (pKey.card !== card.title || pKey.decision !== card.decision) return null;

                    return (
                        <button
                          type="button"
                          key={`${pKey.id}-card-entry`}
                          className={css`
                              border: red solid 1px;
                              background-color: ${pKey.active ? "rgba(255, 255, 255, 0.5)" : "rgba(125, 125, 125, 0.5)"};
                              :hover {
                                background-color: rgba(255, 217, 217, 0.75);  
                              }
                              cursor: ${pKey.active ? "pointer" : "not-allowed"};
                              height: 35px;
                              width: 175px;
                              display: block;
                            `}
                          disabled={!pKey.active}
                          onClick={() => dispatch({
                            type: SELECT_PHASE_KEY,
                            phaseKey: pKey
                          })}
                        >
                          {toTitleCase(pKey.name)}
                        </button>
                      );
                  })}


                </div>))}
          </div>
          {/* <img src={`/images/${selectedPhaseOption.name}.png`} width="1000px" /> */}
        </div>
      </div>)}
    </div>
  );
}

export default DesktopFlowChart;