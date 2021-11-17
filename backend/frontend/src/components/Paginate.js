import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function Paginate({ pages, page, keyword = '', is_admin = false }) {

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                // Can't use Link from react-router with a proper behaviour
                <Pagination.Item
                    key={x + 1}
                    active={x + 1 === page}
                    href={!is_admin ?
                        `/?keyword=${keyword}&page=${x + 1}`
                        : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                    }
                >
                    {x + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    ))
}
