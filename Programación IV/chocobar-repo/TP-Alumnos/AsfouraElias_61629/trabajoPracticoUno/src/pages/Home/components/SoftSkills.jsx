import { softSkills } from "../../../utils/softSkillsData";
import "../../../styles/SoftSkills.css"

const SoftSkills = () => {

    return (

        <div className="SoftSkillsBox">
            <h1>Soft Skills</h1>
            <div className="SoftSkillsList">
                {softSkills.map((skill, index) => (
                    <div key={index} className="SoftSkillCard">
                        <h3>{skill.titulo}</h3>
                        <p>{skill.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>

    )

}

export default SoftSkills;