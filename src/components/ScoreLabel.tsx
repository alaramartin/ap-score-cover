import { colors } from "../styles/colors.ts";

interface Props {
    score: number;
}

function ScoreLabel({ score }: Props) {
    const getScoreColor = (score: number) => {
        if (score === 5) return colors.score5;
        if (score >= 3) return colors.score34;
        return colors.score12;
    };

    return (
        <div
            style={{
                backgroundColor: getScoreColor(score),
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontFamily: "sans-serif",
                fontSize: "12px",
                fontWeight: "bold",
            }}
        >
            {score}
        </div>
    );
}

export default ScoreLabel;
