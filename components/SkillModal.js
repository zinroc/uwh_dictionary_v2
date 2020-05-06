/* eslint-disable no-restricted-globals */
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'

import PhaseInfo from '../data/phase'

import toTitleCase from '../helpers'

import { SELECT_PHASE_KEY } from '../redux/modules/main'

const Modal = () => {
  const dispatch = useDispatch()

  const selectedPhaseKey = useSelector((state) => state.main.selectedPhaseKey)
  const selectedPhaseOption = useSelector(
    (state) => state.main.selectedPhaseOption
  )

  if (!selectedPhaseKey) return null
  return (
    <div
      className={css`
        width: 100px;
      `}
    >
      <ReactModal
        isOpen={!!selectedPhaseKey}
        onRequestClose={() =>
          dispatch({
            type: SELECT_PHASE_KEY,
            phaseKey: null,
          })
        }
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: '80vh',
            overflow: 'scroll',
          },
        }}
      >
        <button
          type="button"
          className={css`
            float: right;
          `}
          onClick={() =>
            dispatch({
              type: SELECT_PHASE_KEY,
              phaseKey: null,
            })
          }
        >
          X
        </button>
        <h3>
          {toTitleCase(selectedPhaseOption.display_name)}
          {selectedPhaseKey.decision !== selectedPhaseOption.display_name &&
            `->${toTitleCase(selectedPhaseKey.decision)}`}
          {'->'}
          {toTitleCase(selectedPhaseKey.card)}
          {'->'}
          {toTitleCase(selectedPhaseKey.name)}
        </h3>
        {selectedPhaseKey.aliases && (
          <span>
            <span
              className={css`
                font-weight: 900;
              `}
            >
              Also known as:
            </span>
            {selectedPhaseKey.aliases.map((alias) => (
              <span key={alias}>
                {' '}
                {'"'}
                {alias}
                {'"'}{' '}
              </span>
            ))}
          </span>
        )}
        {PhaseInfo.Phase_Key_Values.findIndex(
          (kValue) => kValue && kValue.phase_key === selectedPhaseKey.id
        ) === -1 && <h2>Video Coming Soon...</h2>}
        {PhaseInfo.Phase_Key_Values.map((kValue) => {
          if (kValue.phase_key !== selectedPhaseKey.id) return null

          return (
            <div
              className={css`
                max-width: 600px;
              `}
              key={kValue.value}
            >
              <img
                alt="skillgif"
                src={`https://uwhdictionary.s3.us-east-2.amazonaws.com/${kValue.value}`}
                width="100%"
              />
            </div>
          )
        })}
        Shareable Link:{' '}
        <a
          href={`${location.protocol
            .concat('//')
            .concat(location.host)
            .concat(location.pathname)}?phase=${selectedPhaseOption.id}&key=${
            selectedPhaseKey.id
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`${location.protocol
            .concat('//')
            .concat(location.host)
            .concat(location.pathname)}?phase=${selectedPhaseOption.id}&key=${
            selectedPhaseKey.id
          }`}
        </a>
      </ReactModal>
    </div>
  )
}

export default Modal
