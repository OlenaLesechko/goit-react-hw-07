import { DNA } from 'react-loader-spinner';

export default function Loader() {
    return (
        <div>
        <DNA visible={true} height="98" width="87" ariaLabel="dna-loading" />
        </div>
    );
}