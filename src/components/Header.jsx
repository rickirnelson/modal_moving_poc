import React from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';


class Header extends React.Component {
    render() {
        const isLogin = (window.location.pathname === '/');
        return (
            <div className="header">
                <PageHeader>
                    <div>
                        POC: Asset Review Page
                    </div>
                </PageHeader>
                {!isLogin
                    &&
                    <div className="header-back-button">
                        <Link to={'/'}>
                            <Button>Back</Button>
                        </Link>
                    </div>
                }
            </div>

        );
    }
}

export default Header;
