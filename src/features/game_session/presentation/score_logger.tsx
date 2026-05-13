import { ButtonGrey } from '../../../common/components/Button'

interface IScoreLogger {
    minScore: number,
    maxScore: number,
    addScore: (score: number) => void
}

const ScoreLogger = (props: IScoreLogger) => {

    return (
        <div className='flex flex-col gap-5'>
            <div className='w-full h-32 grid grid-cols-3 gap-1'>
                {
                    Array.from(
                        { length: props.maxScore - props.minScore + 1 },
                        (_, i) => i + props.minScore
                    ).map((v) => <ButtonGrey key={v} onClick={() => props.addScore(v)}>{v}</ButtonGrey>)
                }
            </div>
        </div>
    )
}

export default ScoreLogger