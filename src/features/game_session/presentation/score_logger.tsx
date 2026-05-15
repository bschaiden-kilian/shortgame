import { ButtonGrey } from '../../../common/components/Button'

interface IScoreLogger {
    minScore: number,
    maxScore: number,
    gameComplete: boolean,
    addScore: (score: number) => void
}

const ScoreLogger = (props: IScoreLogger) => {

    return (
        <div className='flex flex-col gap-2'>
            <div className='w-full h-32 grid grid-cols-3 gap-2'>
                {
                    Array.from(
                        { length: props.maxScore - props.minScore + 1 },
                        (_, i) => i + props.minScore
                    ).map((v) => <ButtonGrey disabled={props.gameComplete} key={v} onClick={() => props.addScore(v)}>{v}</ButtonGrey>)
                }
            </div>
            {
                props.minScore === 0 ?
                    <div className='w-full h-16'>
                        <ButtonGrey disabled={props.gameComplete} onClick={() => props.addScore(0)}>No Score</ButtonGrey>
                    </div>
                    : ""
            }
        </div>
    )
}

export default ScoreLogger