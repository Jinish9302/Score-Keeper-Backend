import React, { useEffect, useState } from 'react'

export default function Participant(props) {
    const [participantScores, setScores] = useState(null);
    useEffect(() => {
        let new_scores = [...props.part_scores]
        const comp = (a, b) => {
            return (b["score"] - a["score"]);
        }
        new_scores.sort(comp)
        for (let i = 0, rnk = 1; i < new_scores.length; i++, rnk++) {
            if (i === 0) {
                new_scores[i]["rank"] = rnk;
            } else if (new_scores[i]["score"] === new_scores[i - 1]["score"]) {
                rnk--;
                new_scores[i]["rank"] = rnk;
            } else {
                new_scores[i]["rank"] = rnk;
            }
        }
        setScores([...new_scores])
    }, [props.part_scores])

    return (
        <div className="mx-0 mt-20 mb-16 flex justify-center">
            <table className = "w-4/5 max-w-screen-sm border-collapse">
                <thead>
                    <tr className="rounded-lg shadow bg-blue-100">
                        <th className="px-5 py-2">Rank</th>
                        <th className="px-5 py-2">Participant Name</th>
                        <th className="px-5 py-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {participantScores!==null?participantScores.map((score) => {
                        if (score['rank'] === 1) {
                            return (
                                <tr className="bg-yellow-300 rounded-lg shadow">
                                    <th className="px-5 py-2">👑{score["rank"]}</th>
                                    <th className="px-5 py-2">{score["name"]}</th>
                                    <th className="px-5 py-2">{score["score"]}</th>
                                </tr>
                            );
                        } else if (score['rank'] === 2) {
                            return (
                                <tr className="bg-gray-300 rounded-lg shadow">
                                    <td className="px-5 py-2">{score["rank"]}</td>
                                    <td className="px-5 py-2">{score["name"]}</td>
                                    <td className="px-5 py-2">{score["score"]}</td>
                                </tr>
                            );
                        } else if (score['rank'] === 3) {
                            return (
                                <tr className="bg-amber-700 rounded-lg shadow">
                                    <td className="px-5 py-2">{score["rank"]}</td>
                                    <td className="px-5 py-2">{score["name"]}</td>
                                    <td className="px-5 py-2">{score["score"]}</td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr className="rounded-md shadow">
                                    <td className="px-5 py-2">{score["rank"]}</td>
                                    <td className="px-5 py-2">{score["name"]}</td>
                                    <td className="px-5 py-2">{score["score"]}</td>
                                </tr>
                            );
                        }
                    }):""}
                </tbody>
            </table>

        </div>
    )
}
