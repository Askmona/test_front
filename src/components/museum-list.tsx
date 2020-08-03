import React, { useState, useEffect } from 'react';
import { Museum } from '../interfaces/museum';
import { MuseumAPI } from '../api/museum-api'
import { Link } from 'react-router-dom';
import { StyledOl } from './styled-ol'
import { StyledLi } from './styled-li'
import styled from 'styled-components';
import { StyledButton } from './styled-button'



const museumPerPage = 5;

export const MuseumList: React.FC = () => {

    useEffect(() => {
        document.title = "Musées de France"
    }, [])

    const [typedSearchPattern, setsearchPattern] = useState(''); // pattern in input
    const [submittedSearchPattern, setSubmittedSearchPattern] = useState(''); // effective pattern, updated when the form is submitted

    // Loading museums depending on the page
    const [museums, setMuseums] = useState<Museum[]>([]);
    const [page, setPage] = useState<number>(1)
    useEffect(() => {
        const subscription = MuseumAPI.getMuseums(museumPerPage, museumPerPage * (page - 1), submittedSearchPattern).subscribe(museums => setMuseums(museums))
        return () => subscription.unsubscribe()
    }, [page, submittedSearchPattern])

    // Loads museum count on mount to initialize pagination
    const [totalMuseum, setTotalMuseum] = useState(0);
    useEffect(() => {
        const subscription = MuseumAPI.museumCount(typedSearchPattern).subscribe(setTotalMuseum)
        return () => subscription.unsubscribe()
    }, [submittedSearchPattern])



    return (
        <div>
            <SearchForm onSubmit={e => { e.preventDefault(); setSubmittedSearchPattern(typedSearchPattern) }}>
                <SearchInput placeholder="" type="text" name="search_pattern" onChange={e => setsearchPattern(e.target.value)} />
                <StyledButton type="submit">Rechercher</StyledButton>
            </SearchForm>
            <StyledOl>
                {museums.map(m => (
                    <StyledLi key={m.ref_musee}>
                        <MuseumLink to={`/museum/${m.ref_musee}`}>
                            {m.nom_du_musee}
                        </MuseumLink>
                        <CitySubtitle>{m.ville.toLocaleLowerCase()}</CitySubtitle>
                    </StyledLi>
                ))}
            </StyledOl>
            <PaginationOl>
                {generatePages(page, totalMuseum).map((p, i) =>
                    <li key={p + i}>
                        {
                            p === '...' ?
                                <PageButton disabled>...</PageButton>
                                :
                                <PageButton active={+p === page} onClick={() => setPage(+p)}>{p}</PageButton>

                        }
                    </li>
                )}
            </PaginationOl>
        </div>
    )
}

/**
 * Generates a sequence of strings for the pagination toolbar
 * The sequence can be like [1 , 2 , 3 , ... , 132 , 133] or [1 , ... , 12 , 13 , 14 , ... , 133] depending on what the current page is
 * @param currentPage 
 * @param total The size of the list to display
 */
const generatePages = (currentPage: number, total: number): string[] => {
    const nbPage = Math.ceil(total / museumPerPage);
    const rangeStr = (start: number, end: number) => Array(end + 1 - start).fill(0).map((_, i) => '' + (i + start))
    if (nbPage <= 10) {
        return rangeStr(1, nbPage);
    }
    if (nbPage > 10 && currentPage > 3 && currentPage < nbPage - 3) {
        return ['1', '...', ...rangeStr(currentPage - 2, currentPage + 2), '...', '' + nbPage]
    } else {
        return [...rangeStr(1, 4), '...', ...rangeStr(nbPage - 4, nbPage)]
    }
}


const MuseumLink = styled(Link)`
    text-decoration: none;
    letter-spacing: 1px;
    font-size: 23px;
    color : ${props => props.theme.color.textColor};
    :hover{
        color : ${props => props.theme.color.primary};
    }
    transition: color .2s;
`

const CitySubtitle = styled.p`
    color : ${props => props.theme.color.lightText};
    padding-left: 20px;
    text-transform: capitalize;
    margin-top: 10px;
`
const PaginationOl = styled.ol`
    list-style-type: none;
    float: right;
    > li {
        display: inline-block;   
    }
`
const PageButton = styled.button<{ active?: boolean }>`
    cursor: ${props => props.disabled ? 'default' : 'pointer'};

    padding: 3px;
    border: 1px solid ${props => props.active ? props.theme.color.primary : props.theme.color.gray};
    border-radius: 2px;
    margin: 3px;
    width: 34px;
    text-align: center;
    background-color: white;
    color: ${props => props.active ? props.theme.color.primary : props.theme.color.textColor};
    :hover:not(:disabled){
        color : ${props => props.theme.color.primary};
        border-color : ${props => props.theme.color.primary};
    }


    transition: color .2s;
    transition: border-color .2s;
`

const SearchInput = styled.input`
    margin-right: 20px;
    height: 30px;
`

const SearchForm = styled.form`
    margin: 20px 5px;
    display: flex;
    justify-content: flex-end;
`