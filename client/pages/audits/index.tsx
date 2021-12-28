import { useCallback, useEffect, useState } from 'react'

import fetchFromApi from '../../utils/api'

const AuditsIndex = () => {
    const [audits, setAudits] = useState([''])

    const parseAudits = useCallback(async () => {
        const result =  (await fetchFromApi('/api/audits', 'GET')).message
        setAudits((result as object[]).map((r: any) => r.domain))
    }, [])

    useEffect(() => {
        parseAudits()
    }, [parseAudits])
    
    
    return <ul>
       {audits.map(domain => (
           <li key={domain}>{domain}</li>
       ))}
    </ul>
}

export default AuditsIndex