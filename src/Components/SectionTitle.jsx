const SectionTitle = ({ title, subTitle }) => {
    return (
        <div>
            <div className="md:w-4/12 mx-auto text-center my-8">
                <h3 className="text-4xl font-bold uppercase border-b-4 border-yellow-500 inline-block py-2 px-4 tracking-wider">
                    {title}
                </h3>
                <p className="text-xl text-yellow-600 mt-4 italic">{subTitle}</p>
            </div>
        </div>
    );
};

export default SectionTitle;