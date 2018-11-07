import React from 'react';
import { PageHeader } from 'react-bootstrap';

import '../App.css';


class AssetHeader extends React.Component {
    render() {
        return (
            <div className="asset-header">
                <PageHeader>
                    <div>
                        <h4>
                            Header
                        </h4>
                    </div>
                </PageHeader>
            </div>

        );
    }
}

export default AssetHeader;
