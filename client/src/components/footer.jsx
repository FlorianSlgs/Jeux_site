import React, { useState } from 'react';

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <footer className="bg-indigo-900 text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p>© 2025 Quiz multijoueur FR - Le meilleur des quiz en ligne gratuits pour jouer en groupe -- 
                    <button 
                        className="underline focus:outline-none" 
                        onClick={toggleModal}
                    >
                        Mentions légales
                    </button>
                </p>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg text-black max-w-lg w-full">
                        <h2 className="text-2xl font-bold mb-4">Mentions Légales</h2><br/>
                        <div className="space-y-4">
                            <p>
                                <span className="font-semibold">Éditeur du site</span><br/>
                                Le site Quiz Multijoueur FR est édité par : Florian Salengros<br/>
                            </p>
                            <p>
                                <span className="font-semibold">Nom de l’éditeur :</span> Florian Salengros<br/><br/>
                                <span className="font-semibold">Hébergement</span><br/>
                                Le site est hébergé par : Render.com<br/>
                            </p>
                            <p>
                                <span className="font-semibold">Responsabilité</span><br/>
                                L’éditeur du site met tout en œuvre pour garantir l’exactitude des informations publiées. Toutefois, il ne peut être tenu responsable des erreurs, omissions ou résultats liés à l’utilisation des contenus du site.<br/>
                            </p>
                            <p>
                                <span className="font-semibold">Propriété intellectuelle</span><br/>
                                L’ensemble des éléments du site (textes, images, logos, design, quiz) sont protégés par le droit de la propriété intellectuelle et ne peuvent être reproduits sans autorisation.<br/>
                            </p>
                            <p>
                                <span className="font-semibold">Publicité</span><br/>
                                Le site utilise Google AdSense pour afficher des publicités.<br/>
                            </p>
                        </div>
                        <button 
                            className="mt-4 bg-indigo-900 text-white py-2 px-4 rounded" 
                            onClick={toggleModal}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;