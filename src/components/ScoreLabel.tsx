interface Props {
    score: number;
}

function ScoreLabel({ score }: Props) {
    return (
        <div
            style={{
                backgroundColor:
                    score === 5
                        ? "#88E788"
                        : score >= 3
                        ? "#90D5FF"
                        : "#FF474C",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "black",
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
