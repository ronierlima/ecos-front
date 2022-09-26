export const ssn = {
  company_of_interest:  (company_of_interest) => `
    <svg xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" width="201px" version="1.1" height="51px">
        
        <g transform="translate(0.5,0.5)">
            <rect x="0" y="0" width="200" height="50" fill="blue" stroke="black" pointer-events="none"/>
            <g>
                <text x="100" y="30" fill="white" font-family="Arial,Helvetica" font-size="15px" text-anchor="middle" font-weight="bold">${company_of_interest}</text>
            </g>
        </g>

    </svg>   
  `,

  supplier:  (supplier) => `
    <svg xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" width="201px" height="51px" version="1.1">
      
      <g transform="translate(0.5,0.5)">
          <path d="M 0 0 L 160 0 L 160 0 L 200 25 L 160 50 L 160 50 L 0 50 Z" fill="orange" stroke="black" stroke-miterlimit="10" pointer-events="none"/>
          <g>
              <text x="100" y="30" fill="black" font-family="Arial,Helvetica" font-size="15px" text-anchor="middle" font-weight="bold">${supplier}</text>
          </g>
      </g>

    </svg>
  `,

  customer:  (customer) => `
    <svg xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" width="201px" height="51px" version="1.1">

      <path d="M 0 0 L 160 0 L 160 0 L 200 25 L 160 50 L 160 50 L 0 50 Z" fill="yellow" stroke="black" stroke-miterlimit="10" transform="translate(100,0)scale(-1,1)translate(-100,0)" pointer-events="none" />
      <g>
          <text x="100" y="30" fill="black" font-family="Arial,Helvetica" font-size="15px" text-anchor="middle" font-weight="bold">${customer}</text>
      </g>

    </svg>
  `,

  customers:  (customer_customer) => `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="201px" height="51px" version="1.1" style="background-color: ">
     
      <g transform="translate(0.5,0.5)">
        <path d="M 0 0 L 199.75 0 L 199.75 0 L 199.75 50 L 0 50 L 35.25 25 Z" fill="lightgrey" stroke="black" stroke-miterlimit="10" transform="translate(100,0) scale(-1,1)translate(-100,0)" pointer-events="none" />
        <g>
          <text x="85" y="30" fill="black" font-family="Arial,Helvetica" font-size="15px" text-anchor="middle" font-weight="bold">${customer_customer}</text>
        </g>
      </g>

    </svg>
  `,

  aggregator:  (aggregator) => `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="201px" height="51px" version="1.1">
     
      <g transform="translate(0.5,0.5)">
        <path d="M 0 50 L 40 0 L 200 0 L 160 50 Z" fill="red" stroke="black" stroke-miterlimit="10" pointer-events="none" />
        <g>
          <text x="100" y="30" fill="black" font-family="Arial,Helvetica" font-size="15px" text-anchor="middle" font-weight="bold">${aggregator}</text>
        </g>
      </g>

    </svg>
  `,

  business_relationship: () => `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="51px" height="26px" version="1.1">
     
      <g transform="translate(0.5,0.5)">
        <path d="M 0 0 L 40 0 L 40 0 L 50 12.5 L 40 25 L 40 25 L 0 25 Z" fill="white" stroke="black" stroke-miterlimit="10" pointer-events="none" />
      </g>

    </svg>
  `,
  intermediary:  (intermediary) => `
    <svg xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" width="201px" height="51px" version="1.1">
     
      <g transform="translate(0.5,0.5)">
          <path d="M 0 25 L 40 0 L 40 0 L 160 0 L 160 0 L 200 25 L 160 50 L 160 50 L 40 50 L 40 50 Z" fill="limegreen" stroke="black" stroke-miterlimit="10" pointer-events="none"/>
          <g>
              <text x="100" y="30" fill="black" font-family="Arial,Helvetica" font-size="15px" text-anchor="middle" font-weight="bold">${intermediary}</text>
          </g>
      </g>

    </svg>
  `,

  or:  (or) => `
    <svg xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" width="41px" height="41px" version="1.1">
     
      <g transform="translate(0.5,0.5)">
          <path d="M 20 0 L 40 20 L 20 40 L 0 20 Z" fill="black" stroke="black" stroke-miterlimit="10" pointer-events="none"/>
          <g>
              <text x="20" y="25" fill="white" font-family="Arial,Helvetica" font-size="15px" text-anchor="middle" font-weight="bold">${or}</text>
          </g>
      </g>

    </svg>
  `,

  xor: () => `
    <svg xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" width="41px" height="41px" version="1.1">
      
      <g transform="translate(0.5,0.5)">
          <path d="M 20 0 L 40 20 L 20 40 L 0 20 Z" fill="black" stroke="black" stroke-miterlimit="10" pointer-events="none"/>
          <g>
              <text x="20" y="25" fill="white" font-family="Arial,Helvetica" font-size="15px" text-anchor="middle" font-weight="bold"></text>
          </g>
      </g>
      
    </svg>
  `,
};
