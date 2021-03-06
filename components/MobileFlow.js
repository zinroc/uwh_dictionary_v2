import { css } from 'emotion'
import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PhaseInfo from '../data/phase'
import toTitleCase from '../helpers'
import { SELECT_PHASE_OPTION, SELECT_PHASE_KEY } from '../redux/modules/main'

const MobileFlowChart = ({
  selectedPhaseOption,
  selectedCards,
  selectedPhaseKeys,
}) => {
  const dispatch = useDispatch()

  const selectedPhaseKey = useSelector((state) => state.main.selectedPhaseKey)

  const highlightedPhaseKey = useSelector(
    (state) => state.main.highlightedPhaseKey
  )

  const isMobile = useSelector((state) => state.main.isMobile)

  const BottomOfPhaseOptions = useRef(null)

  const scrollToRef = (ref) =>
    window.scrollTo({ top: ref.current.offsetTop + 350 })

  useEffect(() => {
    if (!selectedPhaseKey && selectedPhaseOption && isMobile) {
      scrollToRef(BottomOfPhaseOptions)
    }
  }, [selectedPhaseKey])
  return (
    <div
      className={css`
        position: relative;
        @media (min-width: 1000px) {
          display: none;
        }
      `}
    >
      {PhaseInfo.Phase_Options.map((po) => (
        <div key={`${po.id}-phase-info-mobile`}>
          <button
            type="button"
            trigger={po.display_name}
            // open={selectedPhaseOption && selectedPhaseOption.id === po.id}
            onClick={() =>
              dispatch({
                type: SELECT_PHASE_OPTION,
                phaseOption: po,
              })
            }
            className={css`
              display: block;
              width: 100%;
              cursor: pointer;
              padding: 15px;
              font-size: 25px;
              text-align: left;
            `}
          >
            {toTitleCase(po.display_name)}
          </button>
          {selectedPhaseOption && po.id === selectedPhaseOption.id && (
            <div
              className={css`
                border: 1px solid black;
                padding: 15px;
              `}
            >
              <div ref={BottomOfPhaseOptions} />
              {selectedCards.map((card) => (
                <div key={`${card.title}${card.decision}-mobile-card`}>
                  <h2>
                    {toTitleCase(card.decision)}
                    {'->'}
                    {toTitleCase(card.title)}
                  </h2>
                  {selectedPhaseKeys.map((pk) => {
                    if (pk.card !== card.title) return null
                    return (
                      <button
                        type="button"
                        key={`${pk.id}-phase-key-mobile`}
                        disabled={!pk.active}
                        className={css`
                          margin: 10px;
                          cursor: ${pk.active ? 'pointer' : 'not-allowed'};
                          display: block;
                          width: 100%;
                          font-size: 25px;
                          ${highlightedPhaseKey === pk.id &&
                          'border: solid black 3px;'}
                          background-color: rgba(255, 255, 255, 0.5);
                          :hover {
                            background-color: rgba(255, 217, 217, 0.75);
                          }
                          :disabled {
                            background-color: grey;
                          }
                        `}
                        onClick={() => {
                          dispatch({
                            type: SELECT_PHASE_KEY,
                            phaseKey: pk,
                            isMobile: true,
                          })
                        }}
                      >
                        {toTitleCase(pk.name)}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MobileFlowChart
