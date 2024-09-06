export default function WorkersItems({emploee}){
    const {fullName, job, education, institution, yearOfGraduation, speciality} = emploee
    return (
        <>
        <tr className="border-b hover:bg-gray-100">
            <td className="py-4 px-6">{fullName}</td>
            <td className="py-4 px-6">{job}</td>
            <td className="py-4 px-6">{education}</td>
            <td className="py-4 px-6">{institution}</td>
            <td className="py-4 px-6">{yearOfGraduation}</td>
            <td className="py-4 px-6">{speciality}</td>
            </tr>
        </>
    )
}